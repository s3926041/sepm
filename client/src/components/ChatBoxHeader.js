import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import gmatch from "../Assest/gmatch.svg";
import { Avatar } from 'antd';
import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { getUsers, logout } from '../services/authService';

const items = [
    {
        label: < Link to="/" onClick={() => { logout() }}><PoweroffOutlined /> Log Out</Link>,
        key: '0',
    },

];

export default function ChatBoxHeader() {
    const [user, setUser] = useState({});
    useEffect(() => {
      const user = getUsers();
      if (user != null) {
        setUser(user.user);
      }
    }, [])
   

    return (
        <header className="bg-white border-gray-400  border-b" >
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 " aria-label="Global">
                <div className="flex lg:flex-1">
                    <div className="-m-1.5 p-1.5">
                        <span className="sr-only">Gmatch Company</span>
                        <img className="h-8 w-auto" src={gmatch} alt="Gmatch" />
                    </div>
                </div>
                
                <Dropdown
                    menu={{
                        items,
                    }}
                    trigger={['hover']}
                    className="lg:flex lg:gap-x-1"
                >
                        <Space>
                            <div className="text-sm flex flex-row font-semibold leading-6 text-gray-900" onClick={(e) => e.preventDefault()}>
                                <Avatar icon={<UserOutlined />} size={30} />
                                <span className='ml-2'>{user.name}</span>
                            </div>
                            <DownOutlined />
                        </Space>
                </Dropdown>
                
            </nav>
            
        </header>
    )
}
