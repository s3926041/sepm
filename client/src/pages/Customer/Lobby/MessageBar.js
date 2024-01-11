import {  SendOutlined, SmileOutlined } from "@ant-design/icons";

function MessageBar({ handleSendMessage, handleMessageChange, message }) {


    return (
    <div className="" style={{width: "95%", }}>
        {/* <div className="flex items-center py-2 px-3 bg-white rounded-lg dark:bg-gray-700" >
           
            <textarea
                id="chat"
                rows={1}
                className="block mx-4 p-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your message..."
                defaultValue={""}
                value={message}
                onChange={handleMessageChange}
            />
            <button
                type="submit"
                className="inline-flex justify-center p-4 text-blue-600 rounded-full cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                onClick={handleSendMessage}
            >
                <SendOutlined/>
            </button>
        </div> */}

            <div className="flex flex-row items-center h-16 mt-2 w-full" >

                <div className="flex-grow ">
                    <div className="relative w-full ">
                        <input
                            type="text"
                            id="chat"
                            placeholder="Write a message..."
                            value={message}
                            onChange={handleMessageChange}
                            className="flex w-full border focus:outline-none focus:border-indigo-300 pl-4 h-10 text-white"
                            style={{ backgroundColor: "transparent" }}
                        />
                        <button className="absolute flex items-center justify-center h-full w-12 right-10 top-0 text-gray-400 hover:text-gray-600">
                            <SmileOutlined />
                        </button>

                        <button className="absolute flex items-center w-5 h-full justify-center right-0 top-0 hover:bg-indigo-600  text-white px-5 py-5 flex-shrink-0" style={{ backgroundColor: "#408aff" }} onClick={handleSendMessage}>
                            <SendOutlined className="rotate-95"/>
                        </button>
                    </div>
                </div>
                {/* <div className="ml-4">
                    <button className="flex items-center w-9 h-9 justify-center  hover:bg-indigo-600 rounded-xl text-white px-5 py-5 flex-shrink-0" style={{ backgroundColor: "#408aff" }} onClick={handleSendMessage}>

                        <span className="w-5 h-5 ">
                            <SendOutlined />
                        </span>
                    </button>
                </div> */}
            </div>

        
    </div>
 );
}

export default MessageBar;