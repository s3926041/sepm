
function ChatSideIcon() {
    return (
        <div className=' flex bg-white mb-1' style={{borderRadius: "10px", width: "100%"}}>
            <div className="flex flex-row items-center cursor-pointer hover:bg-gray-100 py-2 w-full rounded-md" onClick={() => { }}>
                {/* <div className=" ml-5 w-12  bg-gray-300 rounded-full mr-2">
                    <img
                        src="https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                        alt="User Avatar"
                        className="w-full h-full rounded-full"
                    />
                </div>
                <div className="flex-row">
                    <h2 className="text-lg font-semibold ml-8">hoiang</h2>
                </div> */}

                <button
                    className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                >
                    <div
                        className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
                    >
                        H
                    </div>
                    <div className="ml-3 text-sm font-semibold flex flex-col text-start">
                        <div>Henry Boyd</div>
                        <div className="text-gray-500 text-sm">Hi, I miss you so much...</div>
                    </div>
                </button>
           
            </div>
        </div>

    );
}

export default ChatSideIcon;