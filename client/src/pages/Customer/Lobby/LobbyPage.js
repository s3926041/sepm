import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  AuditOutlined,

  HomeOutlined,

  PoweroffOutlined,

  UserOutlined,

  WhatsAppOutlined,
} from "@ant-design/icons";
import {  Layout, Menu, theme } from "antd";

import Authentication from "../../../components/Authentication";
import {
  getUsers,
  isLoggedIn,
} from "../../../services/authService";
import { API_URL } from "../../../GlobalVar";
const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Home", "0", <HomeOutlined />),
  getItem("Chat", "1", <WhatsAppOutlined />),
  getItem("Profile", "2", <AuditOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Log Out", "3", <PoweroffOutlined />),
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
  }, []);

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
      <Layout className="rounded-2xl" 
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="dark"
          style={{
            backgroundColor: "#edf3fb",
          }}
          className="rounded-2xl"
        >
          {/* <div className="demo-logo-vertical" 
            /> */}
          <Menu
            theme="light"
            defaultSelectedKeys={["0"]}
            mode="inline"
            items={items}
            style={{ backgroundColor: "#edf3fb" }}
          />
        </Sider>

        <Layout>
          {/* <ChatBoxHeader /> */}
          <Content className="breakk" 
          style={{
            backgroundColor: "#002047",
          }}>
            <div className="flex break" 
            
            >

              <Outlet></Outlet>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};
export default App;
