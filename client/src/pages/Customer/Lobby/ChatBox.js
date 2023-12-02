import IncomingChat from "./IncomingChat";
import OutgoingChat from "./OutgoingChat";
import SenderTab from "./SenderTab";

function ChatBox({chatMate, sendMessage}) {
    return (<>
        {/* component */}
        <div className="flex h-screen overflow-hidden">
            
            {/* Main Chat Area */}
            <div className="flex-1">
                {/* Chat Header */}
                <header className="bg-white p-4 text-gray-700">
                    <h1 className="text-2xl font-semibold">{chatMate.name}</h1>
                </header>
                {/* Chat Messages */}
                <div className="h-screen overflow-y-auto p-4 pb-36">
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
                </div>
                {/* Chat Input */}
                <footer className="bg-white border-t border-gray-300 p-4 bottom-0 w-full">
                    <SenderTab chatMate={chatMate} sendMessage={sendMessage}/>
                </footer>
            </div>
        </div>
    </> );
}

export default ChatBox;