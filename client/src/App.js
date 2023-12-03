// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { API_URL } from "./GlobalVar";
import AuthForm from "./components/auth/AuthForm";
import Lobby from "./components/lobby/Lobby";
import Chat from "./components/chat/Chat";
import io from "socket.io-client"

const socket = io(API_URL, {
  withCredentials: true,
});

const socketManager = {
  connectToQueue: (matchPreferences) => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit("connectToQueue", matchPreferences);
  },

  disconnect: () => {
    if (socket.connected) {
      socket.disconnect();
    }
  },

  onMatchFound: (callback) => {
    socket.on("matchFound", callback);
  },

  offMatchFound: (callback) => {
    socket.off("matchFound", callback);
  },
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthForm />} />
        <Route
          path="/lobby"
          element={<Lobby socketManager={socketManager} />}
        />
        <Route
          path="/chat/:id"
          element={<Chat socketManager={socketManager} />}
        />
        <Route path="/" element={<AuthForm />} />
      </Routes>
    </Router>
  );
};

export default App;
