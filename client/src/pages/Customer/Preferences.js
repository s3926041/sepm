import React, { useState } from "react";
import {

  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,

} from "antd";
const Preferences = ({
  setAge,
  setPhone,
  setGender,
  setWith,
  setName,
  preferences,
}) => {
  const [componentSize, setComponentSize] = useState("default");
  const validator = () => {};

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
        textAlign: "!important left",
      }}
    >
      <Form.Item label="Name" required>
        <Input
          onChange={(event) => {
            setName(event.target.value);
            console.log(event.target.value)
          }}
          required
        />
        {!preferences.name && (
          <span style={{ color: "red" }}>
            <br />
            input something
          </span>
        )}
      </Form.Item>

      <Form.Item label="Age" required>
        <DatePicker className="w-full" onChange={(e) => alert(e)} />
      </Form.Item>
      <Form.Item label="Phone">
        <InputNumber
          onChange={(data) => setPhone(data)}
          className="w-full"
          style={{ marginLeft: "0.1rem" }}
        />
      </Form.Item>
      <Form.Item label="Gender" required>
        <Select onChange={(data) => setGender(data)} required>
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>

        </Select>
        {!preferences.gender && (
          <span style={{ color: "red" }}>
            <br />
            input something
          </span>
        )}
      </Form.Item>

      <Form.Item label="Agree" valuePropName="checked" required>
        <Switch style={{ marginRight: "10rem" }} required />
      </Form.Item>
    </Form>
  );
};
export default Preferences;
