import { CloseOutlined, HeartOutlined } from "@ant-design/icons";
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

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

function FindMate({ socketManager }) {
  const [finding, setFinding] = useState(false);
  const [timer, setTimer] = useState(0);
  const [user, setUser] = useState({});
  const [matchId, setMatchId] = useState('');

  const [matchPreferences, setMatchPreferences] = useState({
    userId: user._id,
    skillLevel: "",
    gameMode: "",
  });


  const navigate = useNavigate();
  useEffect(() => {
    const user = getUsers();
    if(user != null){
      setUser(user.user);
    }
  }, [])

  const handleConnect = () => {
    setFinding(!finding);
    socketManager.connectToQueue(matchPreferences);
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
  const handleOk = () => {
    setModalText('Move to The Chat Page after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      navigate("chat/" + matchId);
      setFinding(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('You Just Canceled The Conversation: ' + matchId);
    setOpen(false);
  };


  return (
    <div className="bg-white m-2 findm border-gray-300 border">
      <Modal
        okButtonProps={{ style: { backgroundColor: 'blue' } }} 
        title="Match Found"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>

      <div className="w-full h-full flex flex-col items-center ">
        <header className="bg-white p-4 text-gray-700 w-full text-center border-gray-300 border-b" style={{ borderRadius: "20px 20px 0 0"}}>
          <h1 className="text-2xl font-semibold">Find Mates</h1>
        </header>
        <div className="w-96 h-86 ">
          <Lottie animationData={loading} loop={finding} />
        </div>
        <div className="h-4 text-center mt-2 mb-6 text-gray-600">
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
        </div>
        
        <header className="bg-white p-2 m-3 text-gray-700  border-gray-300 border-b " style={{width:"90%"}}>
          <h1 className="text-xl font-semibold">Previous Matches</h1>
        </header>
        <div className="w-full overflow-scroll" style={{height: "30vh"}}>
          
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
