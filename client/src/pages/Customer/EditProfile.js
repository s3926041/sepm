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
import { message } from "antd";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from "antd";
import { Avatar, Descriptions } from "antd";
import Sliderr from "./Sliderr";
import { useNavigate } from "react-router";
// import { getUsers } from "../../services/authService";
import { getUser } from "../../api/user";
import { updateProfile } from "../../api/user";
import { CloudUploadOutlined } from "@ant-design/icons";

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

  return (
    <div className="mt-7" >
      <div className="flex flex-col mx-auto mb-3 items-center" style={{ width: "50%" }}>
        <Avatar className="mt-5 mx-auto border-gray-300" size={145} src={src} />
        <button
          type="button"
          className="rounded-md mx-auto mt-6 bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={() => importData()}
          style={{ width: "90%" }}
        >
          <CloudUploadOutlined /> Upload...
        </button>
      </div>


      <Descriptions bordered layout={"vertical"} size={"small"} column={1} title="User Info" items={item} className="m-3 py-2 text-center border-gray-400 border rounded-l"/>
<button
        type="submit"
        className=" mt-2 flex mx-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        style={{ width: "50%" }}
        onClick={async () => {
          await updateProfile(avatar);
          message.success("Processing complete!");

        }}
      >
        Modify
      </button> 

<Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: "small",
        }}
        bordered
        style={{
          maxWidth: "80%",
          margin: "2rem auto",
          textAlign: "!important left",
        }}
      >
        <header className="bg-white mb-5 text-gray-700 w-full text-start border-gray-300 border-b" >
          <h1 className="text-xl font-semibold">Preferences</h1>
        </header>

        <Form.Item label="Find">
          <Select value={user.gender} onChange={(data) => setGender(data)}>
            <Select.Option value="male">Male</Select.Option>
            <Select.Option value="female">Female</Select.Option>
            <Select.Option value="none">None</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Level">
          <Select value={"Master"} onChange={(data) => setGender(data)}>
            <Select.Option value="beginer">Beginner</Select.Option>
            <Select.Option value="expert">Expert</Select.Option>
            <Select.Option value="master">Master</Select.Option>
          </Select>
        </Form.Item>



        <button
          type="submit"
          className=" mt-2 flex mx-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          style={{ width: "50%" }}
          onClick={async () => {
            // await updateProfile(avatar);
            message.success("Processing complete!");

          }}
        >
          Change
        </button>
      </Form>


    </div>
  );
}
