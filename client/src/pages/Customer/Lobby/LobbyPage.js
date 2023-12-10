import React, { useState } from 'react';
import { DeleteOutlined, PoweroffOutlined, ScissorOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import Footer from '../../../components/footer';
import ChatBox from './ChatBox';
import FindMate from './FindMate';
import ChatSideBar from './ChatSideBar';
import ChatBoxHeader from '../../../components/ChatBoxHeader';
const { Content, Sider } = Layout;
const App = () => {
    const [mates, setMates] = useState(true);
    const [chatMate, setChatMates] = useState({});
    const [users, setUsers] = useState([
        {
            name: "Hoang",
            status: "new",
            talk: [

            ]
        },
        {
            name: "Hung",
            status: "talked",
            talk: [
                {
                    from: "Hung",
                    message: "Hi"
                },
                {
                    from: "Me",
                    message: "Hi, Hung"
                },
            ]
        }
    ]
    )
    function sendMessage(chatMate, message) {
        let usersClone = [...users];
        usersClone.forEach(u => {
            if (u.name === chatMate.name) {
                u.talk.push(
                    {
                        from: "Me",
                        message: message,
                    }
                )
                return;
            }
            // alert(chatMate.name)
        })

        setUsers(usersClone);
        // alert(mates)
    }

    function deleteTalk(user) {
        let usersClone = users.filter(u => u.name !== user.name);
        setUsers(usersClone);
        window.location.reload();
    }

    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }
    const items = [
        getItem('Log Out', '1', <PoweroffOutlined />),
        getItem("Edit Profile", "2", <ScissorOutlined />)

    ];

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                theme="light"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['4']}
                    items={items}
                    onClick={(value) => console.log(parseInt(value.key))}
                />
                <Button className='w-full mb-2' onClick={() => setMates(true)}>Find Mates</Button>
                {users.map(u => <ChatSideBar setMates={setMates} user={u} setChatMates={setChatMates} deleteTalk={deleteTalk} />)}


            </Sider>
            <Layout>


                {/* <Header /> */}

                <ChatBoxHeader />
                <Content
                    style={{
                        margin: '24px 16px 1rem',
                    }}
                >

                    {mates ? <FindMate users={users} setUsers={setUsers} />
                        :
                        <ChatBox chatMate={chatMate} sendMessage={sendMessage} />
                    }

                    {/* <ChatBox /> */}
                    {/* <FindMate /> */}

                </Content>


                <Footer />
            </Layout>
        </Layout>
    );
};
export default App;