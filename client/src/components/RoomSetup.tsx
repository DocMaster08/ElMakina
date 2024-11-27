import { useState } from "react";

interface Props {
  onCreateRoom: (nickname: string) => void;
  onSelectRoom: (nickname: string) => void;
}

function RoomSetup(props:Props) {

  const [nickname, setNickname] = useState("");

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome to El Makina!</h2>

      <div style={styles.nicknameSection}>
        <p>To enter the room, choose a nickname:</p>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Enter your nickname"
          style={styles.input}
        />
      </div> 

      <button onClick={() => {nickname!='' && props.onCreateRoom(nickname)}} style={styles.but1}>
        Create Room
      </button>
      <button onClick={() => {nickname!='' && props.onSelectRoom(nickname)}} style={styles.but2}>
        Join Room
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "300px",
    padding: "20px",
    margin: "50px auto",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "20px",
  },
  nicknameSection: {
    marginBottom: "20px",
  },
  input: {
    width: "80%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  but1: {
    padding: "10px 15px",
    background: "#33afff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    marginRight: "5px",
    textDecoration: "None",
  },
  but2: {
    padding: "10px 15px",
    background: "#3feb56",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    textDecoration: "None",
  },
};

export default RoomSetup;
