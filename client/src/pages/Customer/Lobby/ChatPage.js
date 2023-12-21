import ChatBox from './ChatBox';
import ChatSideIcon from './ChatSideIcon';
import React, { useState } from 'react';
import {

    DeleteOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons';
import { Layout, Menu, message } from 'antd';
import { Modal } from 'antd';
import { useNavigate, useParams } from 'react-router';
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
    getItem('Lobby', '1', <UsergroupAddOutlined />),
    getItem('Delete', '2', 
        <DeleteOutlined />
    ),
];

const confirm = (e) => {
    console.log(e);
    message.success('Click on Yes');
};
const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
};



const ChatPage = ({ socketManager }) => {

    let { chatid } = useParams();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Delete A Match with ID: ' + chatid);
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setModalText('Delete Completedlyt, Move to The Lobby');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Cancel Delete');
        setOpen(false);
    };

    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    return (
        <Layout>
           
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={(e) => {
                if(e.key === "1"){
                        navigate("/lobby");
                }else{
                    showModal();
                }
                }}/>
            </Sider>
        <Layout>
                <Modal
                    title="Delete Match"
                    open={open}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <p>{modalText}</p>
                </Modal>

                <Content
                    style={{
                        margin: '24px 16px 1rem',
                        height: "92vh",
                        marginBottom: "3rem"
                    }}

                >
                    <ChatBox socketManager={socketManager} />
                </Content>


            </Layout>
        </Layout>
    );
};
export default ChatPage;