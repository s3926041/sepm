function IncomingChat({message, user}) {
    return (
    <div className="flex mb-4 cursor-pointer" style={{ marginBottom: "1.5rem"}}>
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0" style={{ height: "3rem", width: "3rem" }}>
            <img
                src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                alt="User Avatar"
                className="w-full h-full rounded-full"
            />
        </div>
            <div className="relative ml-3 text-lg bg-white py-2 px-4 shadow rounded-xl" style={{ }}>
            <p className="font-bold text-wrap">
                {`${user}:`}
             </p>
            <p className="text-gray-700">{message}</p>
        </div>
    </div> );
}

export default IncomingChat;