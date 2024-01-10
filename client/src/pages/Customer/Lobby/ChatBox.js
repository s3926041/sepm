import IncomingChat from "./IncomingChat";
import OutgoingChat from "./OutgoingChat";
import MessageBar from "./MessageBar";
import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMatch, getOtherUser, getUser } from "../../../api/user";

// ... (other imports)

function ChatBox({ socket, chatid }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [otherUser, setOtherUser] = useState({});

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
    const otherParticipant = await getOtherUser(
      matchData.participants.find(
        (participantId) => participantId !== userData?._id
      )
    );
    setUserName(userData?.name);
    setOtherUser(otherParticipant);
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
      <div className="w-full mx-10">
        {/* component */}
        <div className="flex">
          {/* Main Chat Area */}
          <div className="h-full flex-1">
            {/* Chat Header */}
            <header
              className="bg-white p-4 py-6 text-white mb-3 rounded-2xl"
              style={{ backgroundColor: "#001329" }}
            >
              {/* <h1 className="text-2xl font-semibold">{chatid}</h1> */}
              <div className="flex flex-row items-center  w-full">
                <div className="ml-2 flex items-center justify-center h-10 w-10 bg-amber-500 rounded-full">
                  H
                </div>

                <div className="font-semibold flex flex-col text-start text-sm w-full">
                  <div
                    className="ml-4 flex justify-between text-white"
                    style={{ fontSize: ".9rem" }}
                  >
                    <span>{otherUser?.name}</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Chat Messages */}
            <div
              className="overflow-y-scroll p-4 pb-36 bg-white relative rounded-2xl"
              style={{ height: "auto", backgroundColor: "#001329" }}
            >
              {messages?.map((msg) => {
                if (msg?.sender !== userId) {
                  return (
                    <IncomingChat message={msg?.message} user={userName} />
                  );
                } else {
                  return <OutgoingChat message={msg?.message} user={"You"} />;
                }
              })}
              <div ref={div}></div>
              <MessageBar
                handleSendMessage={handleSendMessage}
                handleMessageChange={handleMessageChange}
                message={message}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/5 " style={{ height: "100%" }}>
        <div
          className="max-w-lg bg-white rounded-2xl shadow-md p-5"
          style={{ height: "103.5%", backgroundColor: "#001329" }}
        >
          <img
            className="w-32 h-32 rounded-full mt-4 mx-auto"
            src={"https://picsum.photos/200"}
            alt="Profile picture"
          />

          <h2 className="text-center text-xl font-semibold mt-3 text-white">
            {otherUser?.name}
          </h2>
          <p className="text-center text-gray-600  text-sm mt-1 text-white/75">
            Software Engineer
          </p>

          <div className="mt-14">
            <h3 className="text-lg font-semibold text-white">Bio</h3>
            <p className="text-white/75 mt-2 text-justify">
              John is a software engineer with over 10 years of experience in
              developing web and mobile applications. He is skilled in
              JavaScript, React, and Node.js.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
