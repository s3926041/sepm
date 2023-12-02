import { useState } from 'react'
import { Link } from "react-router-dom"
import {  Popover } from '@headlessui/react'
import gmatch from "../Assest/gmatch.svg";
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';


export default function ChatBoxHeader() {
   

    return (
        <header className="bg-white" style={{ borderBottom: "0.5px solid grey" }} >
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 " aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Gmatch Company</span>
                        <img className="h-8 w-auto" src={gmatch} alt="Gmatch" />
                    </Link>
                </div>
                
                <Popover.Group className="lg:flex lg:gap-x-12">


                    <Link to="/pricing" className="text-sm font-semibold leading-6 text-gray-900">
                        Premium Account
                    </Link>
                    <Link to="/safety" className="text-sm font-semibold leading-6 text-gray-900">
                        Safety Instruction
                    </Link>
                    <Link to="/edit" className="text-sm flex flex-row font-semibold leading-6 text-gray-900">
                        <Avatar icon={<UserOutlined />} size={30} />
                        <span className='ml-2'>Hung Nguyen</span>
                    </Link>
                    
                </Popover.Group>
                
            </nav>
            
        </header>
    )
}
