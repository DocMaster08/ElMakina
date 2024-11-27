import RoomSetup from "../components/RoomSetup";
import {useNavigate} from "react-router-dom";

interface HomePageProps {
  socket: any;
}

const HomePage = ({socket}:HomePageProps) => {
  const navigate = useNavigate();

  const handleCreateRoom = (name: string) => {
    socket.emit("create-room", [socket.id, name]);
    navigate("/rooms/" + socket.id);
  };

  const handleSelectRoom = (name: string) => {
    socket.emit("save-name", name);
    navigate("/rooms");
  };

  return (
    <>
      <RoomSetup
        onCreateRoom={handleCreateRoom}
        onSelectRoom={handleSelectRoom}
      />
      ;
    </>
  );
};

export default HomePage;
