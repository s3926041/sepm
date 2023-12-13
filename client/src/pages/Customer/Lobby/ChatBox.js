import IncomingChat from "./IncomingChat";
import OutgoingChat from "./OutgoingChat";
import MessageBar from "./MessageBar";
import React, { useRef, useEffect } from 'react';

function ChatBox({chatMate, sendMessage}) {
   
    const div = useRef(null);
    const scrollToBottom = () => {
        div.current?.scrollIntoView({ behavior: "smooth" })

    }

    useEffect(
        scrollToBottom
    , [chatMate.talk.length]);

    return (
    <>
        {/* component */}
        <div className="flex overflow-hidden">
            
            {/* Main Chat Area */}
            <div className="h-full flex-1">
                {/* Chat Header */}
                <header className="bg-white p-4 text-gray-700">
                    <h1 className="text-2xl font-semibold">{chatMate.name}</h1>
                </header>
                {/* Chat Messages */}
                    <div className="overflow-scroll p-4 pb-36" style={{ height: "45vh" }}>
                    {
                        chatMate.talk.map(t => {
                            
                            if (t.from === chatMate.name){
                                return (
                                    <IncomingChat message={t.message}/>
                                )
                            }else{
                                return ( <OutgoingChat message={t.message}/> )
                            }
                        })
                    }
                    <div ref={div} ></div>
                </div>
                {/* Chat Input */}
                <div className="bg-white border-t border-gray-300 p-4 bottom-0 w-full">
                    <MessageBar chatMate={chatMate} sendMessage={sendMessage}/>
                </div>
            </div>
        </div>
    </> );
}

export default ChatBox;