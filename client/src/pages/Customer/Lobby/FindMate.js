import { CloseOutlined, HeartOutlined } from "@ant-design/icons";
import '../../../material-tailwind.css'
import gamer from "../../../Assest/gamer1.png";
function FindMate({users,setUsers}) {



    return (
    <>
            <div className="mx-auto flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md" draggable 
                >
            <div className="relative mx-4 mt-4 h-80 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                <img
                    src={gamer}
                    alt="profile-picture"
                    style={{height: "100%", objectFit:"cover"}}
                />
            </div>
            <div className="p-6 text-center">
                <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    Hung Nguyen
                </h4>
                <p className="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
                    CEO / Co-Founder
                </p>
                <p className="block font-sans text-base font-medium leading-relaxed">
                        I am a software engineer with over 10 years of experience in developing
                        web and mobile applications. I am skilled in JavaScript, React, and
                        Node.js.
                </p>
            </div>
            <div className="flex gap-7 p-6 pt-2 justify-between">
               
                    <button
                        type="submit"
                        className="flex w-1/2 justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {
                            let usersClone = [...users];
                            usersClone.push(
                                {
                                    name: "Hung Nguyen",
                                    type: "new",
                                    talk: [],
                                }
                            )
                            setUsers(usersClone);
                        }}
                    >
                        <HeartOutlined />
                    </button>

                    <button
                        type="submit"
                        className="flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <CloseOutlined />
                    </button>
                
            </div>
        </div>
       
        
        {/* stylesheet */}
        {/* <link
            rel="stylesheet"
            href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
        /> */}

        {/* Font Awesome Link */}
        {/* <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
            integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w=="
            crossOrigin="anonymous"
        /> */}
    </>
 );
}

export default FindMate;