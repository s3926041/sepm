import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
const Dashboard = (number) => (
    <Row gutter={16}>
        <Col span={12}>
            <Card bordered={false}>
                <Statistic
                    title="Active"
                    value={number.number}
                    precision={2}
                    valueStyle={{
                        color: '#3f8600',
                    }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                />
            </Card>
        </Col>
        <Col span={12}>
            <Card bordered={false}>
                <Statistic
                    title="Idle"
                    value={number.number * 0}
                    precision={2}
                    valueStyle={{
                        color: '#cf1322',
                    }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                />
            </Card>
        </Col>
    </Row>
);
export default Dashboard;