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
const Preferences = () => {
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
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
            // onValuesChange={onFormLayoutChange}
            // size={componentSize}
            style={{
                maxWidth: 600,
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
                <Input/>
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
                <DatePicker className='w-full'/>
            </Form.Item>
            <Form.Item label="Phone" >
                <InputNumber className='w-full' style={{ marginLeft: "0.1rem" }} />
            </Form.Item>
            <Form.Item label="With">
                <Select>
                    <Select.Option value="demo">Male</Select.Option>
                    <Select.Option value="demo">Female</Select.Option>
                    <Select.Option value="demo">None</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label="Agree" valuePropName="checked">
                <Switch style={{ marginRight: "10rem" }} />
            </Form.Item>
            
        </Form>
    );
};
export default Preferences;