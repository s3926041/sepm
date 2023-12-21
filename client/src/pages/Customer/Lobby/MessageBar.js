import { PaperClipOutlined, SendOutlined } from "@ant-design/icons";
import { useState } from "react";

function MessageBar({chatMate, sendMessage}) {
    const[message,setMessages] = useState("");

    return (<div>
        <label htmlFor="chat" className="sr-only">
            Your message
        </label>
        <div className="flex items-center py-2 px-3 bg-white rounded-lg dark:bg-gray-700">
            <button
                type="button"
                className="inline-flex justify-center p-4 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            >
                <PaperClipOutlined className="h-full w-full"/>
            </button>
            
            <textarea
                id="chat"
                rows={1}
                className="block mx-4 p-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your message..."
                defaultValue={""}
                value={message}
                onChange={(e) => {setMessages(e.target.value)}}
            />
            <button
                type="submit"
                className="inline-flex justify-center p-4 text-blue-600 rounded-full cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                onClick={() => {sendMessage(chatMate,message); setMessages("")}}
            >
                <SendOutlined/>
            </button>
        </div>
    </div>
 );
}

export default MessageBar;