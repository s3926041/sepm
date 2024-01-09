import IncomingChat from "./IncomingChat";
import OutgoingChat from "./OutgoingChat";
import MessageBar from "./MessageBar";
import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMatch, getUser } from "../../../api/user";

// ... (other imports)

function ChatBox({ socket,chatid }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");


  const [match, setMatch] = useState({});

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() === "") {
      return;
    }

    // Send the message to the server
    socket.emit("sendMessage", {
      matchId: chatid,
      sender: userId,
      message,
    });

    setMessage("");
  };

  const div = useRef(null);
  const scrollToBottom = () => {
    div.current?.scrollIntoView({ behavior: "smooth" });
  };
  const fetchData = async () => {
    const matchData = await getMatch(chatid);
    setMatch(matchData);

    const userData = await getUser();
    setUserId(userData?._id);
    setUserName(userData?.name);
    console.log(userData?.name);
    console.log(userData?._id);
  };

  useEffect(() => {
    fetchData();
  }, [chatid]);

  useEffect(() => {
    setMessages(match?.conversation);
  }, [match]);
  
  useEffect(() => {
    if (!socket?.connected) {
      
      socket?.connect();
    }
    socket?.emit("joinMatchRoom", chatid);

    // Clean up the socket connection when the component unmounts
    return () => {
      socket?.disconnect();
    };
  }, [chatid, socket]);

  useEffect(() => {
    socket.on("messageReceived", (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  }, [socket]);

  useEffect(scrollToBottom, [messages?.length]);
  //   console.log(userId);
  return (
    <>
      {/* component */}
      <div className="flex overflow-scroll" style={{ borderRadius: "1rem" }}>
        {/* Main Chat Area */}
        <div className="h-full flex-1" style={{ borderRadius: "1rem" }}>
          {/* Chat Header */}
          <header className="bg-white p-4 text-gray-700">
            <h1 className="text-2xl font-semibold">{chatid}</h1>
          </header>
          {/* Chat Messages */}
          <div className="overflow-scroll p-4 pb-36" style={{ height: "72vh" }}>
            {messages?.map((msg) => {
              if (msg?.sender !== userId) {
                return <IncomingChat message={msg?.message} user={userName} />;
              } else {
                return <OutgoingChat message={msg?.message} user={"You"} />;
              }
            })}
            <div ref={div}></div>
          </div>
          {/* Chat Input */}
          <div className="bg-white border-t border-gray-300 p-4 bottom-0 w-full">
            <MessageBar
              handleSendMessage={handleSendMessage}
              handleMessageChange={handleMessageChange}
              message={message}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
