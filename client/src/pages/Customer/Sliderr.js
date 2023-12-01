import React, { useState } from 'react';
import { Col, InputNumber, Row, Slider, Space } from 'antd';
const IntegerStep = () => {
    const [inputValue, setInputValue] = useState(1);
    const onChange = (newValue) => {
        setInputValue(newValue);
    };
    return (
        <Row>
            <Col span={12}>
                <Slider
                    min={1}
                    max={20}
                    onChange={onChange}
                    value={typeof inputValue === 'number' ? inputValue : 0}
                />
            </Col>
            <Col span={4}>
                <InputNumber
                    min={1}
                    max={20}
                    style={{
                        margin: '0 16px',
                    }}
                    value={inputValue +" Km"}
                    onChange={onChange}
                />
            </Col>
        </Row>
    );
};

const Sliderr= () => (
    <Space
        style={{
            width: '100%',
        }}
        direction="vertical"
    >
        <IntegerStep />
    </Space>
);
export default Sliderr;