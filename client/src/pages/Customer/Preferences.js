import React, { useState } from 'react';
import {
    
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    
    Select,
    Switch,
    TreeSelect,
} from 'antd';
const Preferences = ({setGame,setAge,setLevel,setPhone,setGender, setWith,setName, preferences}) => {
    const [componentSize, setComponentSize] = useState('default');
    const validator = () => {

    }


    
    return (
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
            
            style={{
                maxWidth: 600,
                textAlign: '!important left',
            }}
        >
            <Form.Item label="Name" required >
                <Input onChange={data => setName(data)} required />
                {!preferences.name && <span style={{ color: "red" }}><br />input something</span>}
            </Form.Item>
            <Form.Item label="Gender" required>

                <Select onChange={(data) => setGender(data)} required>
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Famale">Female</Select.Option>
                    <Select.Option value="None">None</Select.Option>
                </Select>
                {!preferences.gender && <span style={{ color: "red" }}><br />input something</span>}

            </Form.Item>
            <Form.Item label="Game" required>
                {/* <TreeSelect
                    onChange={(e) => alert(e)}
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
                /> */}
                <Select onChange={(data) => setGame(data)} required>
                    <Select.Option value="LoL">LOL</Select.Option>
                    <Select.Option value="CSGO">CSGO</Select.Option>
                    <Select.Option value="8XBET">8XBET</Select.Option>
                </Select>
                {!preferences.game && <span style={{ color: "red" }}><br />input something</span>}

            </Form.Item>
            <Form.Item label="Level" required>
                {/* <Cascader
                    onChange={(e) => alert(e)}
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
                /> */}
                <Select onChange={(data) => setLevel(data)} required>
                    <Select.Option value="Begginer">Begginer</Select.Option>
                    <Select.Option value="Middle">Middle</Select.Option>
                    <Select.Option value="Senior">Senior</Select.Option>
                </Select>
                {!preferences.level && <span style={{ color: "red" }}><br />input something</span>}

            </Form.Item>
            <Form.Item label="Age" required>
                {/* <DatePicker className='w-full' onChange={(e) => alert(e)} /> */}
                <Input onChange={data => setAge(parseInt(data))}/>
                {!preferences.age && <span style={{ color: "red" }}><br />input something</span>}

            </Form.Item>
            <Form.Item label="Phone" >
                <InputNumber className='w-full' style={{ marginLeft: "0.1rem" }} onChange={data => setPhone(data)} />
            </Form.Item>
            <Form.Item label="With" required >
                <Select onChange={(data) => setWith(data)} required> 
                    <Select.Option value="WithMale">Male</Select.Option>
                    <Select.Option value="WithFemale">Female</Select.Option>
                    <Select.Option value="WithBinary">None</Select.Option>
                </Select>
                {!preferences.With && <span style={{ color: "red" }}><br />input something</span>}

            </Form.Item>

            <Form.Item label="Agree" valuePropName="checked" required>
                <Switch style={{ marginRight: "10rem" }} required />
                
            </Form.Item>
            
        </Form>
    );
};
export default Preferences;