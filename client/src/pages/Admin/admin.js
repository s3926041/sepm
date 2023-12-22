import React, { useState } from 'react';
import {
    PoweroffOutlined,
    UserOutlined,
    SmileTwoTone
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import DataTable from './datatable';
import Dashboard from './dashboard';
import { useNavigate } from 'react-router';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    // getItem('Option 1', '1', <PieChartOutlined />),
    // getItem('Option 2', '2', <DesktopOutlined />),
    getItem('Admin', 'sub1', <UserOutlined />, [
        getItem('User', '3', <SmileTwoTone />),
        // getItem('Bill', '4'),
        // getItem('Alex', '5'),
    ]),
    // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Log Out', '9', <PoweroffOutlined />),
];
const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [number, setNumber] = useState(1);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={(value) => {
                    console.log(parseInt(value.key));
                    if(value.key === "9"){
                        navigate("/");
                    };
                }} />
            </Sider>
            <Layout>
                
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        <Breadcrumb.Item>Admin</Breadcrumb.Item>
                        <Breadcrumb.Item>Control Pannel</Breadcrumb.Item>
                    </Breadcrumb>
                   

                    <Dashboard number={number}/>


                    <DataTable setNumber={setNumber}/>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Gmatch ©2023 Designed by Gmatch
                </Footer>
            </Layout>
        </Layout>
    );
};
export default Admin;