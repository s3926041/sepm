import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  PoweroffOutlined,
  ScissorOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Footer from "../../../components/footer";
import ChatBox from "./ChatBox";
import FindMate from "./FindMate";
import ChatSideBar from "./ChatSideIcon";
import ChatBoxHeader from "../../../components/ChatBoxHeader";
import ChatSideIcon from "./ChatSideIcon";
import GlobalChat from "./GlobalChat";
import EditProfile from "../EditProfile";
import Authentication from "../../../components/Authentication";
import {
  checkTokenExpiration,
  getUsers,
  isLoggedIn,
} from "../../../services/authService";
import { API_URL } from "../../../GlobalVar";
import io from "socket.io-client";
const { Content, Sider } = Layout;
const socket = io(API_URL, {
  withCredentials: true,
});

const socketManager = {
  connectToQueue: (matchPreferences) => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit("connectToQueue", matchPreferences);
  },

  disconnect: () => {
    if (socket.connected) {
      socket.disconnect();
    }
  },

  onMatchFound: (callback) => {
    socket.on("matchFound", callback);
  },

  offMatchFound: (callback) => {
    socket.off("matchFound", callback);
  },

  sendGlobalChatMessage: (message) => {
    socket.emit("globalChatMessage", { message });
  },

  sendPrivateChatMessage: (chatid, message) => {
    if (socket.connected) {
      socket.emit("privateChatMessage", { matchId: chatid, message: message });
    }
  },

  // Function to receive global chat messages
  onPrivateChatMessage: (callback) => {
    socket.on("privateChatMessage", callback);
  },

  // Function to stop listening to global chat messages
  offPrivateChatMessage: (callback) => {
    socket.off("privateChatMessage", callback);
  },

  // Function to receive global chat messages
  onGlobalChatMessage: (callback) => {
    socket.on("globalChatMessage", callback);
  },

  // Function to stop listening to global chat messages
  offGlobalChatMessage: (callback) => {
    socket.off("globalChatMessage", callback);
  },
};
const App = () => {
  const [width, setWidth] = useState(500);

  //   {
  //     name: "Hoang",
  //     status: "new",
  //     talk: [],
  //   },
  //   {
  //     name: "Hung",
  //     status: "talked",
  //     talk: [
  //       {
  //         from: "Hung",
  //         message: "Hi",
  //       },
  //       {
  //         from: "Me",
  //         message: "Hi, Hung",
  //       },
  //     ],
  //   },
  // ]);
  // const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Authentication />
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
          width={300}
        >
          <EditProfile />
        </Sider>

        <Layout>
          <ChatBoxHeader />
          <Content
            style={{
              margin: "24px 16px 1rem",
              marginBottom: "3rem",
            }}
            className="breakk"
          >
            <div className="flex break">
              <FindMate socketManager={socketManager} />
              <GlobalChat socketManager={socketManager}></GlobalChat>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default App;
