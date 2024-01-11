import IncomingChat from "./IncomingChat";
import OutgoingChat from "./OutgoingChat";
import MessageBar from "./MessageBar";
import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getMatch, getOtherUser, getUser } from "../../../api/user";
import { Avatar } from "antd";

// ... (other imports)

function ChatBox({ socket, chatid }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [otherUser, setOtherUser] = useState({});
  const [src, setSrc] = useState(null);
  const [match, setMatch] = useState({});
  const [on, setOn] = useState(false);

  const [icons, setIcons] = useState([
    "😅",
    "😁",
    "😂",
    "😍",
    "😔",
    "😡",
    "😤",
    "😨",
    "😭",
    "😬",
    "😫",
    "😱",
    "😴",
    "😷",
    "😵",
    "🙁",
    "🤔",
    "🤢",
    "🤣",
    "🤤",
    "🤨",

  ]);


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
   
    console.log(otherParticipant);
  };

  useEffect(() => {
    fetchData();
  }, [chatid]);

  useEffect(() => {
    setMessages(match?.conversation);
  }, [match]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (otherUser != null) {
          const uint8Array = new Uint8Array(otherUser?.avatarImg.data.data);
          // const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
          const dataUrl = `data:${otherUser.avatarImg.contentType};base64,${uint8ArrayToBase64(uint8Array)}`;
          setSrc(dataUrl);
          console.log(otherUser);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [otherUser]); 

  // Function to convert Uint8Array to base64 in chunks
  function uint8ArrayToBase64(uint8Array) {
    const CHUNK_SIZE = 0x8000;
    const length = uint8Array.length;
    let base64String = '';

    for (let i = 0; i < length; i += CHUNK_SIZE) {
      const chunk = uint8Array.subarray(i, i + CHUNK_SIZE);
      base64String += String.fromCharCode.apply(null, chunk);
    }

    return btoa(base64String);
  }

  // useEffect(() => {
  //   if (!socket?.connected) {
  //     socket?.connect();
  //   }
  //   socket?.emit("joinMatchRoom", chatid);
  //   return () => {
  //     socket?.disconnect();
  //   };
  // }, [chatid, socket]);

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
      <div className="w-3/6 h-full mx-10">
        {/* component */}
        <div className="flex h-full">
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
              className="  relative rounded-2xl"
              style={{ height: "88%", backgroundColor: "#001329" }}
            >
              <div className="absolute top-0 p-4 w-full overflow-y-auto"  style={{height: "90%"}}>
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
            </div>

              {
                on &&
                <div style={{
                  height: "10%",

                }}
                  className="absolute bottom-20  flex flex-row items-center  w-full px-10  rounded-xl"

                >

                  <div style={{
                    backgroundColor: "#333333",
                    borderRadius: "20px 20px",
                    height: "100%",
                    fontSize: "2rem"
                  }}
                    className="flex flex-row items-center overflow-x-auto justify-center w-full  rounded-xl">
                    {icons.map(ic => {
                      return (
                        <div className="mx-3" onClick={() => { setMessage(message + " " + ic) }}>{ic}</div>
                      );
                    })}
                  </div>
                </div>
              }
            
            <div className="absolute bottom-0 w-full pt-4 pb-2 px-4 flex justify-center">
              <MessageBar
                handleSendMessage={handleSendMessage}
                handleMessageChange={handleMessageChange}
                message={message}
                setOn={setOn}
                on={on}
              />
            </div>

            </div>
          </div>
        </div>
      </div>
      <div className="w-2/6 " style={{ height: "100%" }}>
        <div
          className="max-w-lg bg-white rounded-2xl shadow-md p-5"
          style={{ height: "100%", backgroundColor: "#001329" }}
        >
          <img
            className="w-40 h-40 rounded-full mt-4 mx-auto object-cover"
            src={src}
            alt="Profile picture"
          />
          {/* <Avatar className="w-32 h-32 rounded-full mt-4 mx-auto"  src={src} /> */}

          <h2 className="text-center text-xl font-semibold mt-3 text-white">
            {otherUser?.name}
          </h2>
          <p className="text-center text-gray-600  text-sm mt-1 text-white/75">
            Software Engineer
          </p>

          <div className="mt-14">
            <h3 className="text-lg font-semibold text-white">Bio</h3>
            <p className="text-white/75 mt-2 text-justify">
              {otherUser?.name} is a software engineer with over 10 years of experience in
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
