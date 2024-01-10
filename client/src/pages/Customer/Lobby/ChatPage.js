import ChatBox from "./ChatBox";
import React, { useState, useEffect } from "react";
import { SettingOutlined } from "@ant-design/icons";

import { Badge, Layout } from "antd";
import { useNavigate } from "react-router";
import Authentication from "../../../components/Authentication";
import { io } from "socket.io-client";
import { API_URL } from "../../../GlobalVar";
import { getAllMatches, getOtherUser, getUser } from "../../../api/user";

import { getUsers } from "../../../services/authService";
const { Content, Sider } = Layout;
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
    const items = await Promise.all(
      req?.map(async (match) => {
        const otherParticipantId =
          match.participants[0] === userId
            ? match.participants[1]
            : match.participants[0];

        const otherParticipant = await getOtherUser(otherParticipantId);
        const otherParticipantName = otherParticipant?.name;

        return { matchId: match._id, otherParticipantName };
      })
    );

    // Use Array.reduce to convert the array into an object
    const itemsObject = items.reduce((obj, item) => {
      obj[item.matchId] = item.otherParticipantName;
      return obj;
    }, {});

    setMatches(req);
    setItems(itemsObject);
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
          const base64String = btoa(
            String.fromCharCode.apply(null, uint8Array)
          );
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
    width: "97%",
  };
  const getLatestMessage = (match) => {
    if (match && match.conversation && match.conversation.length > 0) {
      return match.conversation[match.conversation.length - 1];
    }
    return null;
  };
  return (
    <>
      <Authentication />

      <div className="w-full rounded-[20px]  ml-10 flex ">
        <Sider
          width={"18rem"}
          className="rounded-2xl "
          style={{
            backgroundColor: "#002047",
          }}
        >
          <div className="demo-logo-vertical" />
          <div className="py-5">
            <div className="ml-4 flex text-white text-base">
              <div>
                Inbox
                <Badge size="small" count={109} style={{}} className="ml-1" />
              </div>
              <span style={{ marginLeft: "9.4rem" }}>
                <SettingOutlined />
              </span>
            </div>

            <div
              className="relative rounded-full flex justify-center mt-2"
              style={{ backgroundColor: "#001329" }}
            >
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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

          <div
            className=" overflow-y-scroll rounded-2xl flex flex-col items-center ml-1"
            style={{ height: "75vh", backgroundColor: "#001329" }}
          >
            {matches.map((match) => (
              <div
                key={match._id}
                style={{ height: "6.5rem" }}
                className=""
                onClick={() => {
                  setCurrentChat(match._id);
                }}
              >
                <div
                  className="flex flex-col py-6 w-full border-blue-900 border-b hover:bg-white hover:text-black"
                  style={{ paddingLeft: "10px", paddingRight: "30px" }}
                >
                  {
                    <div className="flex flex-row items-center  w-full">
                      <Badge
                        size="small"
                        count={5}
                        style={{ backgroundColor: "#52c41a" }}
                      >
                        <div className="ml-3 flex items-center justify-center h-10 w-10 bg-gray-100 rounded-full">
                          H
                        </div>
                      </Badge>
                      <div className="font-semibold flex flex-col text-start text-sm w-full">
                        <div
                          className="ml-4 flex justify-between text-white"
                          style={{ fontSize: ".9rem" }}
                        >
                          <span>{items[match._id]}</span>{" "}
                          <span style={{ fontSize: "0.6rem" }}>5m</span>
                        </div>
                        <div
                          className="text-white/50  ml-4"
                          style={{ fontSize: ".68rem" }}
                        >
                          {
                            match?.conversation[match.conversation.length - 1]
                              ?.message
                          }
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            ))}
          </div>
          {/* </Menu> */}
        </Sider>

        {currentChat && (
          <>
            <ChatBox socket={socket} chatid={currentChat} />
          </>
        )}
      </div>
    </>
  );
};
export default ChatPage;
