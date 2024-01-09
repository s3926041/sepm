/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import React, { useEffect, useState } from "react";
import { List, message } from "antd";
import {
  Form,
  Select,

} from "antd";
import { Avatar, Descriptions } from "antd";

import { useNavigate } from "react-router";

import { getUser } from "../../api/user";
import { updateProfile } from "../../api/user";
import { CloudUploadOutlined, MailOutlined, MobileOutlined, SmileOutlined, TeamOutlined } from "@ant-design/icons";
import "../Customer/Lobby/breakpoint.css"
const { Option } = Select;

export default function EditProfile() {
  const [componentSize, setComponentSize] = useState("default");
  const navigate = useNavigate();
  const [src, setSrc] = useState(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [item, setItem] = useState([]);


  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUser();

        if (users != null) {
          const uint8Array = new Uint8Array(users?.avatarImg.data.data);
          const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
          const dataUrl = `data:${users.avatarImg.contentType};base64,${base64String}`;
          setSrc(dataUrl);
          setUser(users); // Update the user state
          const items = [
            {
              key: '1',
              label: 'UserName:',
              children: user.name,
            },
            {
              key: '2',
              label: 'Telephone:',
              children: user.phone,
            },
            {
              key: '3',
              label: 'Email:',
              children: user.email,
            },
            {
              key: '4',
              label: 'Gender:',
              children: user.gender,
            },
          ];
          setItem(items);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]); 

  

  const [isEditable, setIsEditable] = useState(false);

  function importData() {
    let input = document.createElement("input");
    input.type = "file";

    input.onchange = (_) => {
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

  const data = [
    {
      title: 'User Name:',
      icon: <SmileOutlined />,
      value: user.name,
    },
    {
      title: 'Phone:',
      icon: <MobileOutlined />,
      value: user.phone,
    },
    {
      title: 'Gender:',
      icon: <TeamOutlined />,
      value: user.gender,
    },
    {
      title: 'Email:',
      icon: <MailOutlined />,
      value: user.email,
    },
  ];

  return (
    <div className="rounded-xl bg-white findm flex flex-col items-center" >
      {/* <h1 className="text-center font-bold text-2xl mt-3"> User's Profile</h1> */}
      <div className="flex flex-col mx-auto mb-3 items-center" style={{ width: "50%" }}>
        <Avatar className="mt-9 mx-auto border-gray-300" size={155} src={src} />
        <button
          type="button"
          className="rounded-md mx-auto mt-6 bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={() => importData()}
          style={{ width: "50%" }}
        >
          <CloudUploadOutlined /> Upload...
        </button>
      </div>

      <div className="mt-2" style={{width: "50%"}}>
        <h3 className="text-lg font-semibold ">Bio:</h3>
        <p className=" mt-2 text-justify overflow-scroll" style={{ height: "40vh" }}>
          <List
          
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                  title={item.title}
                  description={item.value}
                />
              </List.Item>
            )}
          />
        </p>
      </div>
      {/* <Descriptions bordered layout={"vertical"} size={"small"} column={1} title="User Info" items={item} className="m-3 py-2 text-center border-gray-400 border rounded-l"/> */}
<button
        type="submit"
        className=" mt-10 flex mx-auto justify-center rounded-full bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        style={{ width: "50%" }}
        onClick={async () => {
          await updateProfile(avatar);
          message.success("Processing complete!");

        }}
      >
        Modify
      </button> 



    </div>
  );
}
