import ChatBox from "./ChatBox";
import ChatSideIcon from "./ChatSideIcon";
import React, { useState, useEffect } from "react";
import { DeleteOutlined, UsergroupAddOutlined } from "@ant-design/icons";

import { Layout, Menu, message } from "antd";
import { Modal, Button } from "antd";
import { useNavigate, useParams } from "react-router";
import Authentication from "../../../components/Authentication";
import { io } from "socket.io-client";
import { API_URL } from "../../../GlobalVar";
import { getAllMatches, getOtherUser, getUser } from "../../../api/user";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const socket = io(API_URL, {
  withCredentials: true,
});

const ChatPage = () => {
  const [userId, setUserId] = useState([]);
  const [matches, setMatches] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const fetchData = async () => {
    const req = await getAllMatches();
    const itemss = await Promise.all(
      req.map(async (match) => {
        const otherParticipant =
          match.participants[0] == userId
            ? await getOtherUser(match.participants[1])
            : await getOtherUser(match.participants[0]);

        const otherParticipantName = otherParticipant?.name;
        return getItem(
          otherParticipantName,
          match._id,
          <UsergroupAddOutlined />
        );
      })
    );
    setMatches(req);
    setItems(itemss);
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(items);
  return (
    <>
      <Authentication />
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
            onClick={(e) => {
              console.log(e.key);
              setCurrentChat(e.key);
            }}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: "24px 16px 0.5rem 0.5rem",
              height: "92vh",
              width: "100%",
              marginBottom: "3rem",
            }}
          >
            {currentChat && (
              <ChatBox socket={socket} chatid={currentChat} />
            )}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default ChatPage;
