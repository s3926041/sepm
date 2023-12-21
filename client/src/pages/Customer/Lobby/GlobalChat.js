import React, { useState, useEffect } from "react";
import { Input, List, Avatar, Button } from "antd";
const GlobalChat = ({ socketManager }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketManager.onGlobalChatMessage((data) => {
      const newMessage = {
        id: Date.now(),
        text: data.message,
        user: data.user,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socketManager.offGlobalChatMessage();
    };
  }, []);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      console.log(messages)
      socketManager.sendGlobalChatMessage(message);
      setMessage("");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <List
        header={<div>Global Chat</div>}
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={(msg) => (
          <List.Item key={msg.id}>
            <List.Item.Meta
              avatar={<Avatar icon={<i className="far fa-user-circle"></i>} />}
              title={`${msg.user}: ${msg.text.message}`}
            />
          </List.Item>
        )}
      />
      <div style={{ marginTop: 16 }}>
        <Input.TextArea
          rows={4}
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
        />
        <Button
          type="primary"
          style={{ marginTop: 8 }}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default GlobalChat;
