function OutgoingChat({ message, user }) {
    return (
        <div className="flex justify-end mb-4 cursor-pointer" style={{ marginBottom: "1.5rem" }}>
            <div className="relative ml-3 text-base py-2 px-4 shadow rounded-xl text-white" style={{ backgroundColor: "#002047", marginRight:" 0.5rem"}} >
            <p className="font-bold text-wrap">
                {`${user}:`}
            </p>
                <p className="text-white/75">
                {message}
            </p>
        </div>
            <div className="flex items-center justify-center rounded-full bg-indigo-500 flex-shrink-0" style={{ height: "2.5rem", width: "2.5rem" }}>
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