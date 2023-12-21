import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import ChatBox from './ChatBox';
import ChatSideIcon from './ChatSideIcon';
const { Content, Sider } = Layout;

const ChatPage = () => {
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
    );
    const [chatMate, setChatMates] = useState(users[users.length - 1]);


    function sendMessage(chatMate, message) {
        let usersClone = [...users];
        usersClone.forEach(u => {
            if (u.name === chatMate.name) {
                u.talk.push(
                    // "Me" => current users
                    {
                        from: "Me",
                        message: message,
                    }
                )
                return;
            }
        })
        setUsers(usersClone);
    }


    function deleteTalk(user) {
        let usersClone = users.filter(u => u.name !== user.name);
        setUsers(usersClone);
    }


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
                {users.map(u => <ChatSideIcon user={u} setChatMates={setChatMates} deleteTalk={deleteTalk} />)}
            </Sider>
        <Layout>

                <Content
                    style={{
                        margin: '24px 16px 1rem',
                        height: "90vh",
                        marginBottom: "3rem"
                    }}

                >
                    {chatMate && <ChatBox chatMate={chatMate} sendMessage={sendMessage} />}


                </Content>


            </Layout>
        </Layout>
    );
};
export default ChatPage;