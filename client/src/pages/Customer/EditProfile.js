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
import { Avatar } from "antd";
import Sliderr from "./Sliderr";
import { useNavigate } from "react-router";
// import { getUsers } from "../../services/authService";
import { getUser } from "../../api/user";
import { updateProfile } from "../../api/user";

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

  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const users = await getUsers();
        const users = await getUser();


        if (users != null) {
          setUser(users);

          // Convert the Buffer data to a base64 string
          const uint8Array = new Uint8Array(users.avatarImg.data.data);
          const base64String = btoa(
            String.fromCharCode.apply(null, uint8Array)
          );

          // Create a data URL
          const dataUrl = `data:${users.avatarImg.contentType};base64,${base64String}`;
          setSrc(dataUrl);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
    };
    input.click();
  }

  return (
    <>
      <div className="flex flex-col mx-auto mb-3" style={{ width: "50%" }}>
        <Avatar className="mt-5 mx-auto" size={150} src={src} />
        <button
          type="button"
          className="rounded-md mx-auto mt-6 bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={() => importData()}
          style={{ width: "50%" }}
        >
          Change
        </button>
      </div>

      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        // onValuesChange={onFormLayoutChange}
        // size={componentSize}
        style={{
          maxWidth: "80%",
          margin: "2rem auto",
          textAlign: "!important left",
        }}
      >
        {/* <Form.Item label="Form Size" name="size">
                <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item> */}

        <Form.Item label="Name">
          <Input
            value={user.name}
            onChange={(data) => {
              setName(data);
            }}
          />
        </Form.Item>
        <Form.Item label="Email">
          <Input value={user.email} onChange={(data) => setEmail(data)} />
        </Form.Item>
        <Form.Item label="Sex">
          <Select value={user.gender} onChange={(data) => setGender(data)}>
            <Select.Option value="demo">Male</Select.Option>
            <Select.Option value="demo">Female</Select.Option>
            <Select.Option value="demo">None</Select.Option>
          </Select>
        </Form.Item>
        {/* <Form.Item label="Game">
                <TreeSelect
                    treeData={[
                        {
                            title: 'Light',
                            value: 'light',
                            children: [
                                {
                                    title: 'Bamboo',
                                    value: 'bamboo',
                                },
                            ],
                        },
                    ]}
                />
            </Form.Item>
            <Form.Item label="Level">
                <Cascader
                    options={[
                        {
                            value: 'zhejiang',
                            label: 'Zhejiang',
                            children: [
                                {
                                    value: 'hangzhou',
                                    label: 'Hangzhou',
                                },
                            ],
                        },
                    ]}
                />
            </Form.Item> */}
        {/* <Form.Item label="Born">
                <DatePicker className='w-full' value={user.}/>
            </Form.Item> */}
        <Form.Item label="Num">
          <Input
            className="w-full"
            style={{ marginLeft: "0.1rem" }}
            value={"84+ " + user.phone}
            readOnly={!isEditable}
            onChange={(data) => setPhone(data)}
          />
        </Form.Item>
        {/* <Form.Item label="With" initialValue="1"> */}
        {/* <Select>
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                    <Select.Option value="none">None</Select.Option>
                </Select> */}

        {/* <Select>
                    <Option value="1">
                       Male
                    </Option>
                    <Option value="2">222</Option>
                </Select> */}
        {/* </Form.Item> */}

        {/* <Form.Item label="Distance" initialValue="1">
                    <Sliderr style={{ margin: "1rem auto" }} />
                </Form.Item> */}

        <button
          type="submit"
          className=" mt-2 flex mx-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          style={{ width: "50%" }}
          onClick={async () => {
            console.log(avatar);
            await updateProfile(avatar);
            navigate("/lobby");
          }}
        >
          Modify
        </button>
      </Form>
    </>
  );
}
