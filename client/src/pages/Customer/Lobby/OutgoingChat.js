function OutgoingChat({ message, user }) {
    return (
    <div className="flex justify-end mb-4 cursor-pointer" style={{ marginBottom: "1.5rem" }}>
            <div className="relative ml-3 text-lg py-2 px-4 shadow rounded-xl" style={{ backgroundColor: "#ebf4ff", marginRight:" 0.5rem"}} >
            <p className="font-bold text-wrap">
                {`${user}:`}
            </p>
            <p>
                {message}
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
    );
}

export default OutgoingChat;