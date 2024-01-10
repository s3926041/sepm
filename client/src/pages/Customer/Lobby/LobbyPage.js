import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AuditOutlined,
  HomeOutlined,
  PoweroffOutlined,
  UserOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";

import Authentication from "../../../components/Authentication";
import { getUsers, isLoggedIn } from "../../../services/authService";
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
  getItem("Home", "/lobby", <HomeOutlined />),
  getItem("Chat", "/lobby/chat", <WhatsAppOutlined />),
  getItem("Profile", "/lobby/profile", <AuditOutlined />),
  getItem("User", "user", <UserOutlined />, [
    getItem("Log Out", "3", <PoweroffOutlined />),
  ]),
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
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Authentication />
      <div
        className="h-full w-full p-5"
        style={{
          background: "#002047",
        }}
      >
        <div className="flex h-full w-full">
          <div
            style={{
              backgroundColor: "#001329",
              borderRadius: "20px 20px"
            }}
            className="h-full w-48"
          >
            <Menu
              theme="light"
              defaultSelectedKeys={["0"]}
              mode="inline"
              items={items}
              style={{ backgroundColor: "#001329", marginTop: "20px",color:"white" }}
              onClick={(e) => {
                navigate(e.key);
              }}
            />
          </div>

          <div className="w-full flex break">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
