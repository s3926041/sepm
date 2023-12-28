import IncomingChat from "./IncomingChat";
import OutgoingChat from "./OutgoingChat";
import MessageBar from "./MessageBar";
import React, { useRef, useEffect, useState } from 'react';
import { useParams } from "react-router";

function ChatBox({socketManager}) {
    
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    let { chatid } = useParams();


    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            console.log(messages)
            socketManager.sendPrivateChatMessage(chatid,message);
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
    <>
        {/* component */}
            <div className="flex overflow-hidden" style={{ borderRadius: "1rem" }}>
            
            {/* Main Chat Area */}
                <div className="h-full flex-1" style={{ borderRadius: "1rem" }}>
                {/* Chat Header */}
                    <header className="bg-white p-4 text-gray-700" >
                    <h1 className="text-2xl font-semibold">{chatid}</h1>
                </header>
                {/* Chat Messages */}
                    <div className="overflow-scroll p-4 pb-36" style={{ height: "72vh" }}>
                    {
                            messages.map(msg => {
                            
                                if (msg.user === msg.user){
                                return (
                                    <IncomingChat message={msg.text.message} user={msg.user}/>
                                )
                            }else{
                                    return (<OutgoingChat message={msg.text.message} user={msg.user} /> )
                            }
                        })
                    }
                    <div ref={div} ></div>
                </div>
                {/* Chat Input */}
                <div className="bg-white border-t border-gray-300 p-4 bottom-0 w-full">
                    <MessageBar handleSendMessage={handleSendMessage} handleMessageChange={handleMessageChange} message={message}/>
                </div>
            </div>
        </div>
    </> );
}

export default ChatBox;