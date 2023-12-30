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
    <>
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

      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="w-96 h-96">
          <Lottie animationData={loading} loop={finding} />
        </div>
        <div className="h-4 text-center text-gray-600">
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
      </div>
    </>
  );
}

export default FindMate;
