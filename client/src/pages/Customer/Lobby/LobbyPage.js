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
import { checkTokenExpiration, getUsers, isLoggedIn } from "../../../services/authService";
const { Content, Sider } = Layout;
const App = ({ socketManager }) => {
  const[ width, setWidth] = useState(500);

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
            <FindMate
              socketManager={socketManager}
            />
              <GlobalChat socketManager={socketManager}></GlobalChat>
          </div>


        </Content>

      </Layout>
    </Layout>
    </>
  );
};
export default App;
