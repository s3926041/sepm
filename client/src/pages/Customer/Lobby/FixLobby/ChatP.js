function ChatP() {
    return ( 
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <div className="w-1/4 bg-white border-r border-gray-300">
                {/* Sidebar Header */}
                <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
                    <h1 className="text-2xl font-semibold">Chat Web</h1>
                    <div className="relative">
                        <button id="menuButton" className="focus:outline-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-100"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path d="M2 10a2 2 0 012-2h12a2 2 0 012 2 2 2 0 01-2 2H4a2 2 0 01-2-2z" />
                            </svg>
                        </button>

                    </div>
                </header>
                {/* Contact List */}
                <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
                    {/* Contact List */}
                    <div className=" bg-gray-100   px-5 pt-5 pb-5">
                        <div className="mx-auto">
                            <div className="px-7 bg-white shadow-lg rounded-2xl">
                                <div className="flex">
                                    <div className="flex-1 group">
                                        <a
                                            href="#"
                                            className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500"
                                        >
                                            <span className="block px-1 pt-1 pb-1">
                                                <i className="far fa-home text-2xl pt-1 mb-1 block" />
                                                <span className="block text-xs pb-2">Home</span>
                                                <span className="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full" />
                                            </span>
                                        </a>
                                    </div>
                                    <div className="flex-1 group">
                                        <a
                                            href="#"
                                            className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500"
                                        >
                                            <span className="block px-1 pt-1 pb-1">
                                                <i className="far fa-compass text-2xl pt-1 mb-1 block" />
                                                <span className="block text-xs pb-2">Explore</span>
                                                <span className="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full" />
                                            </span>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Contact List */}
                    <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                            <img
                                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                alt="User Avatar"
                                className="w-12 h-12 rounded-full"
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold">Alice</h2>
                            <p className="text-gray-600">Hoorayy!!</p>
                        </div>
                    </div>



                </div>



            </div>
            {/* Main Chat Area */}
            <div className="flex-1">
                {/* Chat Header */}
                <header className="bg-white p-4 text-gray-700">
                    <h1 className="text-2xl font-semibold">Alice</h1>
                </header>
                {/* Chat Messages */}
                <div className="h-screen overflow-y-auto p-4 pb-36">
                    {/* Incoming Message */}
                    <div className="flex mb-4 cursor-pointer">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                            <img
                                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                        <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                            <p className="text-gray-700">Hey Bob, how's it going?</p>
                        </div>
                    </div>
                    {/* Outgoing Message */}
                    <div className="flex justify-end mb-4 cursor-pointer">
                        <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                            <p>Hi Alice! I'm good, just finished a great book. How about you?</p>
                        </div>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                            <img
                                src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                alt="My Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                    </div>
                    {/* Incoming Message */}
                    <div className="flex mb-4 cursor-pointer">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                            <img
                                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                        <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                            <p className="text-gray-700">
                                That book sounds interesting! What's it about?
                            </p>
                        </div>
                    </div>
                    {/* Outgoing Message */}
                    <div className="flex justify-end mb-4 cursor-pointer">
                        <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                            <p>
                                It's about an astronaut stranded on Mars, trying to survive.
                                Gripping stuff!
                            </p>
                        </div>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                            <img
                                src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                alt="My Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                    </div>
                    {/* Incoming Message */}
                    <div className="flex mb-4 cursor-pointer">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                            <img
                                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                        <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                            <p className="text-gray-700">
                                I'm intrigued! Maybe I'll borrow it from you when you're done?
                            </p>
                        </div>
                    </div>
                    {/* Outgoing Message */}
                    <div className="flex justify-end mb-4 cursor-pointer">
                        <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                            <p>Of course! I'll drop it off at your place tomorrow.</p>
                        </div>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                            <img
                                src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                alt="My Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                    </div>
                    {/* Incoming Message */}
                    <div className="flex mb-4 cursor-pointer">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                            <img
                                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                        <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                            <p className="text-gray-700">Thanks, you're the best!</p>
                        </div>
                    </div>
                    {/* Outgoing Message */}
                    <div className="flex justify-end mb-4 cursor-pointer">
                        <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                            <p>Anytime! Let me know how you like it. 😊</p>
                        </div>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                            <img
                                src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                alt="My Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                    </div>
                    {/* Incoming Message */}
                    <div className="flex mb-4 cursor-pointer">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                            <img
                                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                        <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                            <p className="text-gray-700">So, pizza next week, right?</p>
                        </div>
                    </div>
                    {/* Outgoing Message */}
                    <div className="flex justify-end mb-4 cursor-pointer">
                        <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                            <p>Absolutely! Can't wait for our pizza date. 🍕</p>
                        </div>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                            <img
                                src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                alt="My Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                    </div>
                    {/* Incoming Message */}
                    <div className="flex mb-4 cursor-pointer">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                            <img
                                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full"
                            />
                        </div>
                        <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                            <p className="text-gray-700">Hoorayy!!</p>
                        </div>
                    </div>
                </div>
                {/* Chat Input */}
                <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500"
                        />
                        <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
                            Send
                        </button>
                    </div>
                </footer>
            </div>
        </div>

     );
}

export default ChatP;