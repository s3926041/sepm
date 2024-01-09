import ChatBox from "./ChatBox";
import React, { useState, useEffect } from "react";
import {  SettingOutlined } from "@ant-design/icons";

import {  Badge, Layout } from "antd";
import { useNavigate,  } from "react-router";
import Authentication from "../../../components/Authentication";
import { io } from "socket.io-client";
import { API_URL } from "../../../GlobalVar";
import { getAllMatches, getOtherUser, getUser } from "../../../api/user";

import { getUsers } from "../../../services/authService";
const {  Content,  Sider } = Layout;
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
      req?.map(async (match) => {
        const otherParticipant =
          match.participants[0] == userId
            ? await getOtherUser(match.participants[1])
            : await getOtherUser(match.participants[0]);

        const otherParticipantName = otherParticipant?.name;
        return getItem(
          // otherParticipantName,
          // "",
          // match._id,
          // <UsergroupAddOutlined />
          // <ChatSideIcon />
          // <button
          //   className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
          // >
          //   <div
          //     className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
          //   >
          //     H
          //   </div>
          //   <div className="ml-3 text-sm font-semibold flex flex-col text-start">
          //     <div>Henry Boyd</div>
          //     <div className="text-gray-500 text-sm">Hi, I miss you so much...</div>
          //   </div>
          // </button>
        );
      })
    );
    setMatches(req);
    setItems(itemss);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [src, setSrc] = useState(null);
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsers();

        if (users != null) {
          const uint8Array = new Uint8Array(users?.avatarImg.data.data);
          const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
          const dataUrl = `data:${users.avatarImg.contentType};base64,${base64String}`;
          setSrc(dataUrl);
          setUser(users); // Update the user state
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]); 

  console.log(items);
  const inputStyle = {

    backgroundColor: "#001329",
    width: "97%"
  
  };

  return (
    <>
      <Authentication />

      <Layout className="rounded-2xl ml-2">
        {/* <Header style={{ width: "100%" }}>Header</Header> */}
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={"18rem"}
          className="rounded-2xl"
          style={{
            backgroundColor: "#002047",
          }}
        >
          <div className="demo-logo-vertical" />



          <div className="py-5"  >
            <div className="ml-4 flex text-white text-base" >
              <div>Inbox 
              <Badge
              size="small"
              count={109}
              style={{
                
              }}
              className="ml-1"
              />
            </div>  
            <span style={{marginLeft: "9.4rem"}}><SettingOutlined /></span>
          </div>

            <div className="relative rounded-full flex justify-center mt-2" style={{ backgroundColor: "#001329" }}>
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none" >
                <svg
                  className="w-4 h-4 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="rounded-full block w-full p-3 ps-10 text-sm text-white"
                style={inputStyle}
                placeholder="Search..."
                required=""
 
              />
             
            </div>
          </div>

          {/* <Menu
            theme="dark"
            // defaultSelectedKeys={["1"]}
            mode="inline"
            // items={items}
            onClick={(e) => {
              console.log(e.key);
              setCurrentChat(e.key);
            }}
            
          > */}
          <div className=" overflow-scroll rounded-2xl flex flex-col items-center ml-1" style={{ height: "75vh", backgroundColor: "#001329" }}>
            {matches.map((match) => (
              <div key={match._id} style={{ height: "6.5rem" }} className="" onClick={() => {
                console.log(match);
                setCurrentChat(match._id);
              }}>
                <div className="flex flex-col py-6 w-full border-blue-900 border-b hover:bg-gray-100 hover:text-black" style={{ paddingLeft: "10px", paddingRight: "30px" }}>
                  {
                    !collapsed ? <div className="flex flex-row items-center  w-full">
                      <Badge size="small" count={5} style={{ backgroundColor: '#52c41a' }}>
                      <div
                          className="ml-3 flex items-center justify-center h-10 w-10 bg-amber-500 rounded-full"
                      >
                        H
                      </div>
                    </Badge>
                      <div className="font-semibold flex flex-col text-start text-sm w-full">
                        <div className="ml-4 flex justify-between text-white" style={{ fontSize: ".9rem" }}><span>Henry Boyd</span> <span style={{fontSize: "0.6rem"}}>5m</span></div>
                        <div className="text-white/50  ml-4" style={{ fontSize: ".68rem" }}>Hi, I need...</div>
                        
                      </div>
                        
                      </div> 
                      : 
                      <Badge size="small" count={5}>
                      <div
                        className="ml-3 flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
                      >
                        H
                      </div>
                    </Badge>
                  }
                  {!collapsed ? <div className=" text-xs mt-2  ml-4 text-white" >John is a software engineer with over 10</div> : <></>}
                  
                </div>
              </div>
            ))}
          </div>
          {/* </Menu> */}


        </Sider>
        <Layout>
          <Content
            style={{
              margin: "10px 16px 0.6rem 0.5rem",
              height: "92vh",
              width: "100%",
              marginBottom: "3rem",
            }}
            className="flex"
          >
            {currentChat && (
              <>
                <ChatBox socket={socket} chatid={currentChat} />
                <div className="w-2/5 mx-3 mr-5" style={{ height: "100%",  }}>
                  <div className="max-w-lg bg-white rounded-2xl shadow-md p-5" style={{ height: "103.5%", backgroundColor: "#001329" }}>
                    <img
                      className="w-32 h-32 rounded-full mt-4 mx-auto"
                      src={"https://picsum.photos/200"}
                      alt="Profile picture"
                    />
                    {/* <Avatar className="w-32 h-32 rounded-full mx-auto" src={src} /> */}
                    <h2 className="text-center text-xl font-semibold mt-3 text-white">John Doe</h2>
                    <p className="text-center text-gray-600  text-sm mt-1 text-white/75">Software Engineer</p>
                    
                    <div className="mt-14">
                      <h3 className="text-lg font-semibold text-white">Bio</h3>
                      <p className="text-white/75 mt-2 text-justify">
                        John is a software engineer with over 10 years of experience in developing
                        web and mobile applications. He is skilled in JavaScript, React, and
                        Node.js.
                      </p>
                    </div>
                  </div>

                </div>
              </>
            )}
          </Content>
          
        </Layout>
      </Layout>
     
    </>
  );
};
export default ChatPage;
