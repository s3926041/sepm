import { CloseOutlined, HeartOutlined } from "@ant-design/icons";
import "../../../material-tailwind.css";
import gamer from "../../../Assest/gamer1.png";
import { loading } from "../../../Assest/loading";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import { Button, Input } from "antd";
import { getUsers } from "../../../services/authService";

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

function FindMate({ users, setUsers, socketManager }) {
  const [finding, setFinding] = useState(false);
  const [timer, setTimer] = useState(0);
  const [user, setUser] = useState(getUsers().user);

  const [matchPreferences, setMatchPreferences] = useState({
    userId: user._id,
    skillLevel: "",
    gameMode: "",
  });
  const navigate = useNavigate();

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
      navigate("/chat/" + data.matchId);
      setFinding(false);
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

  return (
    <>
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
