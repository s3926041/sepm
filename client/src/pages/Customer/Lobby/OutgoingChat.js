function OutgoingChat({ message }) {
    return (
    <div className="flex justify-end mb-4 cursor-pointer" style={{ marginBottom: "0.5rem" }}>
        <div className="flex max-w-96 bg-indigo-600 text-white rounded-lg p-3 gap-3">
            <p>
                {message}
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
    );
}

export default OutgoingChat;