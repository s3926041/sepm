import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuditOutlined,
  DeleteOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  PoweroffOutlined,
  ScissorOutlined,
  SearchOutlined,
  SettingOutlined,
  SmileOutlined,
  TeamOutlined,
  UserOutlined,
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
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Find', '0', <SearchOutlined />),
  getItem('Preferences', '1', <SettingOutlined />),
  getItem('Profile', '2', <AuditOutlined />),
  getItem("User", 'sub1', <UserOutlined />, [
    getItem('Log Out', '3', <PoweroffOutlined />),
    // getItem('Bill', '4'),
    // getItem('Alex', '5'),
  ]),
  // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  // getItem('Files', '9', <FileOutlined />),
];

const App = () => {
  const [width, setWidth] = useState(500);

  const [user, setUser] = useState({});
  useEffect(() => {
    const user = getUsers();
    if (user != null) {
      setUser(user.user);
    }
  }, [])

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


  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  

  return (
    <>
      <Authentication />
      <Layout>
        {/* <Sider
          breakpoint="lg"
          collapsedWidth="0"
          theme="light"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          width={250}
        >
          <EditProfile/>
        </Sider> */}

        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="dark"  style={{
          backgroundColor: "#edf3fb" }}>
          {/* <div className="demo-logo-vertical" 
            /> */}
          <Menu theme="light" defaultSelectedKeys={['0']} mode="inline" items={items} style={{ backgroundColor: "#edf3fb"}} />
        </Sider>

        <Layout>
          {/* <ChatBoxHeader /> */}
          <Content
            className="breakk"
          >
            <div className="flex break">
              <FindMate socketManager={socketManager} />
              <GlobalChat socketManager={socketManager} socket={socket}></GlobalChat>
              
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default App;
