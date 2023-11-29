import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { checkTokenExpiration } from "./service/authService";

const socket = io("http://localhost:5002", {
  withCredentials: true,
});

function App() {
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    checkTokenExpiration();

    userId ? socket.connect() : socket.disconnect();
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleConnect = () => {
    if (userId.trim() !== "") {
      socket.emit("addUser", userId);
    }
  };

  const sendMessage = () => {
    const receiverId = "32"; // Replace with the actual receiver ID
    socket.emit("sendMessage", { senderId: userId, receiverId, text: message });
    setMessage("");
  };

  return (
    <div>
      <div>
        {/* Input for user ID */}
        <label>
          User ID:
          <input
            type="text"
            value={userId}
            onChange={handleUserIdChange}
            placeholder="Enter User ID"
          />
        </label>
        <button onClick={handleConnect}>Connect</button>
      </div>
      <div>
        {/* Display messages */}
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderId}: </strong>
            {msg.text}
          </div>
        ))}
      </div>
      <div>
        {/* Input for sending messages */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
