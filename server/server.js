const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

const rooms = {}; // Store rooms and players {'12345': {players: [{id: '123', name: 'John'}, {id: '456', name: 'Doe'}]}}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("create-room", ([roomId, name]) => {
    rooms[roomId] = { players: [{ id: socket.id, name: name }], name: name + "'s Room" };
    socket.join(roomId);
  });

  socket.on("join-room", ([roomId, name]) => {
    if (!rooms[roomId]) {
      socket.emit("room-not-found");
      return;
    }
    socket.join(roomId);
    rooms[roomId].players.push({ id: socket.id, name: name });
  });

  socket.on("get-room", (roomId) => {
    io.to(roomId).emit("room-data", rooms[roomId]);
  });

  socket.on("get-rooms", () => {
    socket.emit("rooms-data", rooms);
  });

  socket.on("save-name", (name) => {
    socket.name = name;
  });

  socket.on("get-name", () => {
    socket.emit("name-data", socket.name);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    Object.keys(rooms).forEach((roomId) => {
      rooms[roomId].players = rooms[roomId].players.filter(
        (player) => player.id !== socket.id
      );
      io.emit("room-data", rooms[roomId]);
      
      if (rooms[roomId].players.length === 0) delete rooms[roomId];
    });
    io.emit("rooms-data", rooms);
    
    
  });
});

server.listen(4000, () =>
  console.log("Server running on http://localhost:4000")
);
