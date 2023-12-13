import { DeleteOutlined} from '@ant-design/icons';
function ChatSideIcon({setMates,user,setChatMates, deleteTalk}) {
    return (
        <>
            <div className="flex flex-row items-center mt-2 mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md" onClick={() => {setMates("chat"); setChatMates(user)}}>
                <div className="flex-col w-10 h-10 bg-gray-300 rounded-full ml-2">
                    <img
                        src="https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                        alt="User Avatar"
                        className="w-full h-full rounded-full"
                    />
                </div>
                <div className="flex-row">
                    <h2 className="text-lg font-semibold ml-2">{user.name}</h2>

                    {user.talk.length == 0 && 
                    <div
                        class="w-1/2 flex items-center justify-center ml-2 text-xs text-white bg-green-600 h-4 rounded leading-2"
                    style={{backgroundColor:"green", width:"50%"}}
                    >
                        new
                    </div>
                    }
                </div>
                <div className="flex-row ml-9" style={{marginLeft:"2.25rem"}} onClick={
                    (e) => {deleteTalk(user); setMates("lobby"); e.stopPropagation()}
                }>
                    <DeleteOutlined />
                </div>
            </div>
        </>

    );
}

export default ChatSideIcon;