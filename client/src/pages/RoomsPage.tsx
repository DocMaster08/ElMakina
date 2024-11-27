import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Player = {
  id: string;
  name: string;
};

type Room = {
  players: Player[];
  name: string;
};

type Rooms = {
  [key: string]: Room;
};

interface RoomPageProps {
  socket: any;
}

export default function RoomsPage({socket }: RoomPageProps) {
  const navigate = useNavigate();
  const handleJoinRoom = (roomId: string) => {
    socket.emit("join-room", [roomId, savedName]);
    navigate("/rooms/" + roomId);
  };

  const [rooms, setRooms] = useState<Rooms>({});
  const [savedName, setSavedName] = useState("");

  useEffect(() => {
    socket.emit("get-name");
    socket.on("name-data", (name: string) => {
      setSavedName(name);
    });
    socket.emit("get-rooms");
    socket.on("rooms-data", (rooms: Rooms) => {
      setRooms(rooms);
    });

    return () => {
      socket.off("rooms-data");
      socket.off("name-data");
    };
  }, [socket]);

  return (
    <ul>
      {Object.keys(rooms).map((roomId: string) => (
        <li style={styles.li} key={roomId} onClick={() => handleJoinRoom(roomId)}>
          {rooms[roomId].name}
        </li>
      ))}
    </ul>
  );
}

const styles: Record<string, React.CSSProperties> = {
  li: {
    cursor: "pointer",
    padding: "10px",
    margin: "5px",
    background: "#f9f9f9",
    borderRadius: "5px",
  },
  
}
