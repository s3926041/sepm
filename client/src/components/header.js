import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import gmatch from "../Assest/gmatch.svg";
import "./PromotionLog.css";

const style = {
  // '@media (max-width: 500px)': {
  //     display: 'none',
  // },
  display: "none",
};

export default function Header({ user }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    //         <header className="bg-white" style={{ borderBottom: "0.5px solid grey" }} >
    //             <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8 " aria-label="Global">
    //                 <div className="flex lg:flex-1">
    //                     <Link to="/" className="-m-1.5 p-1.5">
    //                         <span className="sr-only">Gmatch Company</span>
    //                         <img className="h-8 w-auto" src={gmatch} alt="Gmatch" />
    //                     </Link>
    //                 </div>
    //                 <div className="lg:hidden">
    //                     <button
    //                         type="button"
    //                         className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
    //                         onClick={() => setMobileMenuOpen(true)}
    //                     >
    //                         <span className="sr-only">Open Menu</span>
    //                         <Bars3Icon className="h-6 w-6" aria-hidden="true" />
    //                     </button>
    //                 </div>

    //                 {user ?
    //                     <Link to="/lobby" className="text-sm flex flex-row font-semibold leading-6 text-gray-900">
    //                         <Avatar icon={<UserOutlined />} size={30} />
    //                         <span className='ml-2'>Hung Nguyen</span>
    //                     </Link>
    //                     :

    //                 <Popover.Group className="md:hidden sm:hidden lg:flex lg:gap-x-12 log">
    //                     <Link to="/pricing" className="text-sm font-semibold leading-6 text-gray-900">
    //                         Premium Account
    //                     </Link>
    //                     <Link to="/safety" className="text-sm font-semibold leading-6 text-gray-900">
    //                         Safety Instruction
    //                     </Link>
    //                     <Link to="/createprofile" className="text-sm font-semibold leading-6 text-gray-900">
    //                         Register
    //                     </Link>
    //                 </Popover.Group>

    // }

    //                 {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
    //                     <Link to="/login" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
    //                         Log in <span aria-hidden="true">&rarr;</span>
    //                     </Link>
    //                 </div> */}

    //             </nav>
    //             <Dialog as="div" className="lg:hidden md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
    //                 <div className="fixed inset-0 z-10" />
    //                 <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
    //                     <div className="flex items-center justify-between">
    //                         <Link to="/" className="-m-1.5 p-1.5">
    //                             <span className="sr-only">Gmatch Company</span>
    //                             <img className="h-8 w-auto" src={gmatch} alt="Gmatch" />
    //                         </Link>

    //                         <button
    //                             type="button"
    //                             className="-m-2.5 rounded-md p-2.5 text-gray-700"
    //                             onClick={() => setMobileMenuOpen(false)}
    //                         >
    //                             <span className="sr-only">Close menu</span>
    //                             <XMarkIcon className="h-6 w-6" aria-hidden="true" />
    //                         </button>

    //                     </div>
    //                     <div className="mt-6 flow-root">
    //                         { user  ?
    //                             <Link to="/lobby" className="text-sm flex flex-row font-semibold leading-6 text-gray-900">
    //                             <Avatar icon={<UserOutlined />} size={30} />
    //                             <span className='ml-2'>Hung Nguyen</span>
    //                         </Link>
    // :
    //                         <div className="-my-6 divide-y divide-gray-500/10">
    //                             <div className="space-y-2 py-6">

    //                                 <Link
    //                                     to="/pricing"
    //                                     className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    //                                 >
    //                                     Premium Account
    //                                 </Link>
    //                                 <Link
    //                                     to="/safety"
    //                                     className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    //                                 >
    //                                     Safety Instruction
    //                                 </Link>
    //                                 <Link
    //                                     to="/createprofile"
    //                                     className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    //                                 >
    //                                     Register
    //                                 </Link>
    //                             </div>
    //                             <div className="py-6">
    //                                 <Link
    //                                     to="/login"
    //                                     className="-mx-3 block  leading-7 text-center  rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //                                 >
    //                                     Log in
    //                                 </Link>

    //                             </div>

    //                         </div>
    // }
    //                     </div>
    //                 </Dialog.Panel>
    //             </Dialog>
    //         </header>

    <></>
  );
}
