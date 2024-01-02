import { DeleteOutlined} from '@ant-design/icons';
function ChatSideIcon() {
    return (
        <div className='w-full flex'>
            <div className="flex flex-row items-center cursor-pointer hover:bg-gray-100 py-3 w-full rounded-md" onClick={() => { }}>
                <div className=" ml-10 w-12  bg-gray-300 rounded-full mr-6">
                    <img
                        src="https://placehold.co/200x/ad922e/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
                        alt="User Avatar"
                        className="w-full h-full rounded-full"
                    />
                </div>
                <div className="flex-row">
                    <h2 className="text-lg font-semibold ml-8">hoiang</h2>
                </div>
           
            </div>
        </div>

    );
}

export default ChatSideIcon;