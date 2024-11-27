import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { io } from "socket.io-client";
import HomePage from "./pages/HomePage";
import RoomsPage from "./pages/RoomsPage";
import LobbyPage from "./pages/LobbyPage";
import NotFoundPage from "./pages/NotFountPage";

const socket = io("http://localhost:4000"); // Replace with your server URL

const App = () => {

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
      console.log("Connected with socket id:", socket.id);
    });

    return () => {
      socket.off("connect");
    };
  }, []);

  if (!isConnected) {
    return <div>Loading...</div>;
  }

  const routes = [
    {
      path: "/",
      element: <HomePage socket={socket}/>,
      errorElement: <NotFoundPage />,
    },
    {
      path: "/rooms",
      element: <RoomsPage socket={socket} />,
    },
    {
      path: "/rooms/:roomId",
      element: <LobbyPage socket={socket} />,
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default App;
