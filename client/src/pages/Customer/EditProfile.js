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
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react';
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
} from 'antd';
import { Avatar } from 'antd';
import Sliderr from './Sliderr';
const { Option } = Select;
const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const GapList = [4, 3, 2, 1];


export default function EditProfile() {
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const [user, setUser] = useState(UserList[0]);
    const [color, setColor] = useState(ColorList[0]);
    const [gap, setGap] = useState(GapList[0]);
    const changeUser = () => {
        const index = UserList.indexOf(user);
        setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
        setColor(index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]);
    };


    return (
    <>
        <div className='flex flex-col w-full'>
                <Avatar
                    style={{
                        backgroundColor: color,
                        verticalAlign: 'middle',
                        margin: '1rem auto',
                    }}
                    size="large"
                    gap={gap}
                >
                    {user}
                </Avatar>
                <Button
                    size="small"
                    style={{
                        margin: '1rem auto',
                        verticalAlign: 'middle',
                    }}
                    onClick={changeUser}
                >
                    ChangeUser
                </Button>
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
                maxWidth: "100%",
                textAlign: '!important left',
            }}
        >
            {/* <Form.Item label="Form Size" name="size">
                <Radio.Group>
                    <Radio.Button value="small">Small</Radio.Button>
                    <Radio.Button value="default">Default</Radio.Button>
                    <Radio.Button value="large">Large</Radio.Button>
                </Radio.Group>
            </Form.Item> */}

           
            <Form.Item label="Name" >
                <Input />
            </Form.Item>
            <Form.Item label="Gender">
                <Select>
                    <Select.Option value="demo">Male</Select.Option>
                    <Select.Option value="demo">Female</Select.Option>
                    <Select.Option value="demo">None</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Game">
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
            </Form.Item>
            <Form.Item label="Born">
                <DatePicker className='w-full' />
            </Form.Item>
            <Form.Item label="Phone" >
                <InputNumber className='w-full' style={{ marginLeft: "0.1rem" }} />
            </Form.Item>
            <Form.Item label="With" initialValue="1">
                {/* <Select>
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                    <Select.Option value="none">None</Select.Option>
                </Select> */}

                <Select>
                    <Option value="1">
                       Male
                    </Option>
                    <Option value="2">222</Option>
                </Select>
            </Form.Item>
            
            <div style={{width: "75%", margin:"1rem auto"}}>
                    <Sliderr style={{margin: "1rem auto" }} />
            </div>
                <button
                    type="submit"
                    className=" mt-2 flex w-80 mx-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    
                >
                    Done
                </button>

        </Form>

       </>
    )
}
