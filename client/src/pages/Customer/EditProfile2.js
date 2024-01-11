import { useEffect, useState } from "react";
import { getUser, updateProfile } from "../../api/user";
import { CloudUploadOutlined } from "@ant-design/icons";
import { message } from "antd";

function EditProfile2() {

    const [avatar, setAvatar] = useState(null);
    const [src, setSrc] = useState(null);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await getUser();
                if (users != null) {
                    const uint8Array = new Uint8Array(users?.avatarImg.data.data);
                    // const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
                    const dataUrl = `data:${users?.avatarImg.contentType};base64,${uint8ArrayToBase64(uint8Array)}`;
                    setSrc(dataUrl);
                    setUser(users); 
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [user]); 

    // Function to convert Uint8Array to base64 in chunks
    function uint8ArrayToBase64(uint8Array) {
        const CHUNK_SIZE = 0x8000;
        const length = uint8Array.length;
        let base64String = '';

        for (let i = 0; i < length; i += CHUNK_SIZE) {
            const chunk = uint8Array.subarray(i, i + CHUNK_SIZE);
            base64String += String.fromCharCode.apply(null, chunk);
        }

        return btoa(base64String);
    }

    function importData() {
        let input = document.createElement("input");
        input.type = "file";
        input.onchange = (_) => {
            console.log(input)
            let files = Array.from(input.files);
            let file = files[0];
            if (file.size > 1024 * 1024) {
                alert("File is too large! Max size is 1MB.");
                return;
            } else if (!/\.(jpg|png)$/.test(file.name)) {
                alert("Only JPG and PNG files are allowed!");
                return;
            }
            const imagePath = URL.createObjectURL(file);

            setSrc(imagePath);
            const uploadPhoto = new FormData();
            uploadPhoto.append("image", file);
            setAvatar(uploadPhoto);
            message.success("Avatar changed!");
        };
        input.click();

    }
    

        










    return (
        <div className="w-full h-full ml-5 rounded-3xl" style={{ backgroundColor: "#001329", }}>
    <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0" >
        {/*Main Col*/}
        <div
            id="profile"
            className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
        >
            <div className="p-4 md:p-12 text-center lg:text-left">
                {/* Image for mobile view*/}
                <img
                    className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
                    src={src}
                />
                <button
                        type="button"
                        className="rounded-md mx-auto mt-6 bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        onClick={() => importData()}
                        style={{ width: "50%" }}
                    >
                        <CloudUploadOutlined /> Upload...
                </button>


                <h1 className="text-3xl font-bold pt-8 lg:pt-0">{user.name}</h1>
                <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25" />
                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                    <svg
                        className="h-4 fill-current text-green-700 pr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                    </svg>{" "}
                    Pro Gamer
                </p>
                <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                    <svg
                        className="h-4 fill-current text-green-700 pr-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
                    </svg>{" "}
                    Your Gender - {user.gender}
                </p>
                <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                        <svg
                            className="h-4 fill-current text-green-700 pr-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
                        </svg>{" "}
                        Your Phone - {user.phone}
                </p>
                <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
                        <svg
                            className="h-4 fill-current text-green-700 pr-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
                        </svg>{" "}
                        Your Email - {user.email}
                </p>
               
                <p className="pt-8 text-sm">
                    Welcome to the Gmatch. You are free to update and modify your Data
                </p>
                <div className="pt-12 pb-8">
                    <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
                                onClick={async () => {
                                    if(avatar != null){
                                    await updateProfile(avatar);
                                    message.success("Processing complete!");
                                    }

                                }}
                    >
                        Change Profile
                    </button>
                </div>

            </div>
        </div>
     
    </div>
        </div>
 );
}

export default EditProfile2;