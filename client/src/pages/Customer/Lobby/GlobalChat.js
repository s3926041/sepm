import React, { useState, useEffect } from "react";

import { SendOutlined, SmileOutlined, WechatOutlined } from "@ant-design/icons";
import { useRef } from "react";
import "./breakpoint.css";
import { Badge } from "antd";
import { getUser } from "../../../api/user";
const GlobalChat = ({ socketManager }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [on, setOn] = useState(false);
  const [user, setUser] = useState({});
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

  const fetchData = async () => {
    const data = await getUser();
    setUser(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    socketManager.onGlobalChatMessage((data) => {
      console.log(data);
      const newMessage = {
        id: data.id,
        text: data.message,
        user: data.user,
        // name:  ,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socketManager.offGlobalChatMessage();
    };
  }, [socketManager]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() !== "") {
      socketManager.sendGlobalChatMessage({
        message,
        user: user.name,
        id: user._id,
      });
      setMessage("");
    }
  };

  const div = useRef(null);
  const scrollToBottom = () => {
    div.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages.length]);

  return (
    <div className="breakkk ">
      <div className="h-full flex flex-col">
        <header
          className="bg-white py-3 px-4 flex rounded-xl  border-gray-200"
          style={{
            backgroundColor: "#001329",
            borderRadius: "20px 20px",
          }}
        >
          <WechatOutlined style={{ fontSize: "1.5rem", color: "white" }} />
          <div className="ml-3 flex flex-col">
            <h1 className="text-xl font-semibold text-white">Global Chat</h1>
            <h5 className="text-gray-500 text-sm">
              Online <Badge status="success" />
            </h5>
          </div>
        </header>

        <div
          className="relative  my-5 h-full"
          style={{
            backgroundColor: "#001329",
            borderRadius: "20px 20px",
            height: "!imprtant 100%",
          }}
        >
          <div
            className="absolute top-0 p-4 w-full overflow-y-auto"
            style={{ height: "90%" }}
          >
            {messages.map((msg, i) => {
              if (msg.id === user._id) {
                return (
                  <div
                    key={i}
                    className="flex justify-end mb-3 cursor-pointer"
                    style={{ marginBottom: "1rem" }}
                  >
                    <div
                      className="relative ml-3 text-sm py-2 px-4 shadow rounded-xl text-white"
                      style={{
                        backgroundColor: "#408aff",
                        marginRight: " 0.5rem",
                      }}
                    >
                      <p className="font-bold text-wrap">{`${msg.user}:`}</p>
                      <p className="">{`${msg.text}`}</p>
                    </div>
                    <div
                      className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                      style={{ height: "3rem", width: "3rem" }}
                    >
                      <img
                        src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                        alt="My Avatar"
                        className="w-full h-full rounded-full"
                      />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    className="flex mb-3 cursor-pointer"
                    style={{ marginBottom: "1rem" }}
                  >
                    <div
                      className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                      style={{ height: "3rem", width: "3rem" }}
                    >
                      <img
                        src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                        alt="User Avatar"
                        className="w-full h-full rounded-full"
                      />
                    </div>
                    <div
                      className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                      style={{}}
                    >
                      <p className="font-bold text-wrap">{`${msg.user}:`}</p>
                      <p className="text-gray-700 break-word">{`${msg.text}`}</p>
                    </div>
                  </div>
                );
              }
            })}
            <div ref={div}></div>
          </div>

          {on && (
            <div
              style={{
                height: "10%",
              }}
              className="absolute bottom-20  flex flex-row items-center  w-full px-10  rounded-xl"
            >
              <div
                style={{
                  backgroundColor: "#333333",
                  borderRadius: "20px 20px",
                  height: "100%",
                  fontSize: "2rem",
                }}
                className="flex flex-row items-center overflow-x-auto justify-center w-full  rounded-xl"
              >
                {icons.map((ic) => {
                  return (
                    <div
                      className="mx-3"
                      onClick={() => {
                        setMessage(message + " " + ic);
                      }}
                    >
                      {ic}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div
            style={{
              backgroundColor: "#001329",
              borderRadius: "20px 20px",
              height: "10%",
            }}
            className="absolute bottom-0 flex flex-row items-center h-16 mt-2  w-full px-4  rounded-xl"
          >
            <div className="flex-grow ml-1">
              <div className="relative w-full">
                <input
                  type="text"
                  id="chat"
                  placeholder="Write a message..."
                  value={message}
                  onChange={handleMessageChange}
                  className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                  style={{ backgroundColor: "#edf3fb" }}
                />
                <button
                  className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                  onClick={() => {
                    setOn(!on);
                  }}
                >
                  <SmileOutlined />
                </button>
              </div>
            </div>
            <div className="ml-4">
              <button
                className="flex items-center w-9 h-9 justify-center  hover:bg-indigo-600 rounded-xl text-white px-5 py-5 flex-shrink-0"
                style={{ backgroundColor: "#408aff" }}
                onClick={handleSendMessage}
              >
                <span className="w-5 h-5 ">
                  <SendOutlined />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalChat;
