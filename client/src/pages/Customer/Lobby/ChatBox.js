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
        <div className="flex overflow-hidden" style={{borderRadius: "1.2rem"}}>
            
            {/* Main Chat Area */}
            <div className="h-full flex-1" >
                {/* Chat Header */}
                <header className="bg-white p-4 text-gray-700 border-gray-300  border-b" >
                    <h1 className="text-xl font-semibold ml-4">{chatMate.name}</h1>
                </header>
                {/* Chat Messages */}
                    <div className="overflow-scroll p-4 pb-36" style={{ height: "75vh", backgroundColor:"#f7fafc" }}>
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
                    <div className=" border-t p-4 border-gray-300  bottom-0 w-full bg-gray-50" >
                    <MessageBar chatMate={chatMate} sendMessage={sendMessage} style={{width: "100%"}}/>
                </div>
            </div>
        </div>
    </> );
}

export default ChatBox;