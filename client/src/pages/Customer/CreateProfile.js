import React, { useState } from 'react';
import { message, Steps, theme } from 'antd';
import CreateAccount from './CreateAccount';
import UploadPhotos from './UploadPhotos';
import Preferences from './Preferences';
const steps = [
    {
        title: 'First',
        content: 'First-content',
    },
    {
        title: 'Second',
        content: 'Second-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
    },
];

export default function CreateProfile() {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
  

    return (
        <>
            <div className='w-full'>
                <Steps current={current} items={items} style={{width: "75%", margin: "2rem auto"}}/>
            </div>
        
                
            

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        
                        {current == 0 &&
                            <span>Create your Account</span>
                        }
                        {current == 1 &&
                            <>Upload Your Images</>
                        }
                        {current == 2 &&
                            <>Create Your Profile</>
                        }
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {/* <form className="space-y-6" action="#" method="POST">
                        <div className="text-left">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        
                    </form> */}

                    {current == 0 &&
                        <CreateAccount />
                    }

                    {current == 1 && 
                    <>
                        <UploadPhotos />
                    </>}

                    {current == 2 &&
                        <>
                            <Preferences />
                        </>
                    }

                   

                    <div className='buttons mt-5'>

                        {current > 0 && (

                            <button
                                type="submit"
                                className="flex mt-2 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => prev()}
                            >
                                Previous
                            </button>
                        )}

                        {current < steps.length - 1 && (
                            <button
                                type="submit"
                                className="flex mt-2 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => next()}
                            >
                                Next {" "}<span aria-hidden="true">&rarr;</span>
                            </button>
                        )}

                        {current === steps.length - 1 && (
                            <button
                                type="submit"
                                className=" mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => message.success('Processing complete!')}
                            >
                                Done
                            </button>
                        )}

                    </div>


                </div>
            </div>
        </>
    )
}


