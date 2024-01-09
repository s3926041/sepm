import { CloseOutlined, HeartOutlined, SearchOutlined, TeamOutlined } from "@ant-design/icons";
import "../../../material-tailwind.css";
import gamer from "../../../Assest/gamer1.png";
import { loading } from "../../../Assest/loading";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import { Button, Input } from "antd";
import { getUsers } from "../../../services/authService";
import {  Modal, Space } from 'antd';
import "./breakpoint.css"
import ChatSideIcon from "./ChatSideIcon";
import EditProfile from "../EditProfile";

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

function FindMate({ socketManager,socket }) {
  const [finding, setFinding] = useState(false);
  const [timer, setTimer] = useState(0);
  const [user, setUser] = useState({});
  const [matchId, setMatchId] = useState('');




  const navigate = useNavigate();
  useEffect(() => {
    const user = getUsers();
    if(user != null){
      setUser(user.user);
    }
  }, [])

  const handleConnect = () => {
    setFinding(!finding);
    socketManager.connectToQueue(user._id);
  };

  const handleStop = () => {
    setFinding(false);
    socketManager.disconnect();
  };
  useEffect(() => {
    const handleMatchFound = (data) => {
      console.log("Match found!", data.matchId);
      socketManager.disconnect();
      showModal();
      setTimeout(() => {
        setOpen(false);
        setConfirmLoading(false);
        navigate("chat/");
        setFinding(false);
      }, 5000);
      setMatchId(data.matchId);
    };

    socketManager.onMatchFound(handleMatchFound);

    return () => {
      socketManager.offMatchFound(handleMatchFound);
    };
  }, [navigate]);

  useEffect(() => {
    return () => {
      socketManager.disconnect();
    };
  }, []);
  useEffect(() => {
    let interval;

    if (finding) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setTimer(0);
    }

    return () => clearInterval(interval);
  }, [finding]);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Found A Match' + matchId);
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log('You Just Canceled The Conversation: ' + matchId);
    setOpen(false);
  };


  return (
    <div className="bg-white findm border-gray-200 border-l">
      <Modal
        okButtonProps={{ style: { backgroundColor: 'blue' } }} 
        title="Match Found"
        open={open}
        // onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>

      <div className="w-full h-full flex flex-col items-center ">
        <header className="p-2 mt-1 flex justify-between" style={{ width: "90%" }}>
          <h1 className="font-semibold text-xl font-sans ">Matches</h1>
          <TeamOutlined style={{ fontSize: '1.2rem' }} />
          
        </header>
        <div className="py-2 flex border-gray-300 border-b pb-3" style={{ width: "90%" }}>
          <SearchOutlined style={{ fontSize: '0.7rem' }} />
          <h3 className="font-semibold text-sm text-blue-600/75 font-sans ml-3">Find</h3>
        </div>
        <div className="pt-2 flex" style={{ width: "90%" }}>
          <h1 className="text-gray-700 font-semibold text-sm font-sans">Look Up!</h1>
        </div>
        
        <div className=" w-70 h-48" onClick={(e) => {
          if(timer > 0){
            setFinding(!finding);
            handleStop();
          }else{
            setFinding(!finding);
            handleConnect()
          }
        }}>
          {timer > 0 && <p className="h-1 text-center text-sm">{formatTime(timer)}</p>}
          <Lottie animationData={loading} loop={finding} style={{width: "16rem", height: "13rem"}}/>
        </div>


        {/* <div className="h-4 text-center mt-2 mb-6 text-gray-600">
          {timer > 0 ? (
            <Button
              onClick={() => {
                setFinding(!finding);
                handleStop();
              }}
            >
              {" "}
              Stop
            </Button>
          ) : (
            <Button
              onClick={() => {
                setFinding(!finding);
                handleConnect()
              }}

            >
              Find
            </Button>
          )}
          {timer > 0 && <p>{formatTime(timer)}</p>}
        </div> */}

        
        <header className="py-2" style={{width:"90%"}}>
          <h1 className=" text-gray-700 text-sm font-semibold">All Matches</h1>
        </header>
        <div className="w-full overflow-scroll flex flex-col items-center " style={{height: "50vh"}}>
          
          <ChatSideIcon />
          <ChatSideIcon />
          <ChatSideIcon />
          <ChatSideIcon />
          <ChatSideIcon />

        </div>
        
      </div>
      


    </div>
  );
}

export default FindMate;
