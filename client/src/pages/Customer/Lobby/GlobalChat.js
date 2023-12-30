import React, { useState, useEffect } from "react";
// import { Input, List, Avatar, Button } from "antd";
// import ChatBox from "./ChatBox";
import {  SendOutlined } from "@ant-design/icons";
import { useRef } from 'react';
import { getUsers } from "../../../services/authService";
import "./breakpoint.css"
const GlobalChat = ({ socketManager, socket}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);



  useEffect(() => {
    console.log(socket);

    socketManager.onGlobalChatMessage((data) => {
      const newMessage = {
        id: Date.now(),
        text: data.message,
        user: data.user,
      };
      console.log(data);


      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socketManager.offGlobalChatMessage();
    };
  }, [socketManager]);


  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      // console.log(messages)
      socketManager.sendGlobalChatMessage(message);
      setMessage("");
    }
  };

  const div = useRef(null);
  const scrollToBottom = () => {
    div.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(
    scrollToBottom
    , [messages.length]);

  return (
    <div className="breakkk" style={{marginRight:"1rem"}}>
      {/* <List
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
      /> */}

        {/* Main Chat Area */}
      <div className="h-full  bg-white" style={{ borderRadius: "1rem" }} >
        <header className="bg-white p-4 text-gray-700" style={{ borderRadius: "1rem" }}>
            <h1 className="text-2xl font-semibold">Global Chat</h1>
          </header>
        
          <div className="overflow-scroll p-4 pb-36" style={{ height: "55vh" }}>
            {
              messages.map((msg,i) => {
                if (msg.user === socket?.id) {
                  return (
                    <div key={i} className="flex justify-end mb-4 cursor-pointer" style={{ marginBottom: "1.5rem" }}>
                      <div className="relative ml-3 text-sm py-2 px-4 shadow rounded-xl" style={{ backgroundColor: "#ebf4ff", marginRight: " 0.5rem" }} >
                        <p className="font-bold text-wrap">
                          {`${msg.user}:`}
                        </p>
                        <p className="">
                          {`${msg.text.message}`}
                        </p>
                      </div>
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0" style={{ height: "3rem", width: "3rem" }}>
                        <img
                          src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                          alt="My Avatar"
                          className="w-full h-full rounded-full"
                        />
                      </div>
                    </div> 
                  )
                } else {
                  return (
                    <div className="flex mb-4 cursor-pointer" style={{ marginBottom: "1.5rem" }}>
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0" style={{ height: "3rem", width: "3rem" }}>
                        <img
                          src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                          alt="User Avatar"
                          className="w-full h-full rounded-full"
                        />
                      </div>
                      <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl" style={{  }}>
                        <p className="font-bold text-wrap">
                          {`${msg.user}:`}
                        </p>
                        <p className="text-gray-700 break-word">{`${msg.text.message}`}</p>
                      </div>
                    </div> 
                  )
                }
              })
            }
            <div ref={div} ></div>
          </div>
        </div>
     

      <div style={{ marginTop: 16}}>
        <div className="flex items-center py-2 px-1 bg-white rounded-lg dark:bg-gray-700">
          <textarea
            id="chat"
            rows={1}
            className="block mx-1 ml-2 p-3 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your message..."
            value={message}
            onChange={handleMessageChange}
          />
          <button
            type="submit"
            className="inline-flex justify-center p-3 text-blue-600 rounded-full cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            onClick={handleSendMessage}
          >
            <SendOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalChat;
