import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface LobbyPageProps {
  socket: any;
}

type Player = {
  id: string;
  name: string;
}

type Room = {
  players: Player[];
  name: string;
}

export default function LobbyPage({socket}: LobbyPageProps) {
  const params = useParams();

  const [room, setRoom] = useState<Room>({players: [], name: ""});

  useEffect(() => {
    socket.emit("get-room", [params.roomId]);
    socket.on("room-data", (room: Room) => {
      setRoom(room);
    });

    return () => {
      socket.off("room-data");
    };

  }, [socket]);

  return (
    <>
      <h1>{room.name}</h1>
      <ul>
        {room.players.map((player: Player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </>
  );
}
