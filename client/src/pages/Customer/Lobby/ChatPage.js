import ChatBox from "./ChatBox";
import React, { useState, useEffect } from "react";
import { SettingOutlined } from "@ant-design/icons";

import { Badge, Layout } from "antd";
import { useNavigate } from "react-router";
import Authentication from "../../../components/Authentication";
import { io } from "socket.io-client";
import { API_URL } from "../../../GlobalVar";
import { getAllMatches, getOtherUser, getUser } from "../../../api/user";

const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const ChatPage = ({ socketManager, socket }) => {
  const [userId, setUserId] = useState([]);
  const [matches, setMatches] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === "") {
      setFilteredData(matches);
      return;
    }

    const filteredResults = matches.filter((match) => {
      const otherParticipantName = items[match._id];
      console.log(items[match._id]);
      return otherParticipantName?.toLowerCase().includes(value.toLowerCase());
    });

    setFilteredData(filteredResults);
  };

  useEffect(() => {
    userId && socketManager.addUser(userId);
    return () => {
      socket.disconnect();
    };
  }, [userId, socket]);

  useEffect(() => {
    setUserId(getUser()._id);
  }, []);

  const fetchData = async () => {
    const reqUser = await getUser();
    const req = await getAllMatches();
    const items = await Promise.all(
      req?.map(async (match) => {
        const otherParticipantId =
          match.participants[0] === reqUser._id
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
    req.sort(compareChats);
    setMatches(req);
    setItems(itemsObject);
    setUserId(reqUser._id);
    setFilteredData(req);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    socket.on("messageReceived", () => {
      fetchData();
    });
  }, [socket]);
  const inputStyle = {
    backgroundColor: "#001329",
    width: "97%",
  };

  function compareChats(chatA, chatB) {
    const lastMessageA = chatA?.conversation[chatA?.conversation?.length - 1];
    const lastMessageB = chatB?.conversation[chatB?.conversation?.length - 1];
    return (
      new Date(lastMessageB?.timestamp) - new Date(lastMessageA?.timestamp)
    );
  }
  return (
    <>
      <Authentication />

      <div className="w-full h-full rounded-[20px]  ml-10 flex ">
        <div
          className="rounded-2xl h-full"
          style={{
            backgroundColor: "#002047",
            width: "18rem",
          }}
        >
          <div className="demo-logo-vertical" />
          <div className="py-5">
            <div className="ml-4 flex text-white text-base">
              <div>
                Matches
                <Badge size="small" count={0} style={{}} className="ml-5" />
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
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div
            className="overflow-y-auto rounded-2xl flex flex-col items-center"
            style={{ height: "83%", backgroundColor: "#001329" }}
          >
            {filteredData.map((match) => (
              <div
                key={match._id}
                style={{ height: "6.5rem", width: "90%" }}
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
        </div>

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
