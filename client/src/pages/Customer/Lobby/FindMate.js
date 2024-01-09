import {  TeamOutlined } from "@ant-design/icons";
import "../../../material-tailwind.css";

import { loading } from "../../../Assest/loading";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import { Select } from "antd";
import { getUsers } from "../../../services/authService";
import {  Modal, Form } from 'antd';
import "./breakpoint.css"


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

      <div className="w-full h-full flex flex-col items-center">
        <header className="p-2 mt-1 flex justify-between" style={{ width: "90%" }}>
          <h1 className="font-semibold text-xl font-sans ">Matches</h1>
          <TeamOutlined style={{ fontSize: '1.2rem' }} />
        </header>
        {/* <div className="py-2 flex border-gray-300 border-b pb-3" style={{ width: "90%" }}>
          <SearchOutlined style={{ fontSize: '0.7rem' }} />
          <h3 className="font-semibold text-sm text-blue-600/75 font-sans ml-3">Find</h3>
        </div> */}
        <div className="relative rounded-full flex justify-center mt-2" style={{ backgroundColor: "#001329", width: "90%" }}>
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
            style={{
              backgroundColor: "#001329",
              width: "97%"
            }}
            placeholder="Search..."
            required=""

          />

        </div>

        <div className="pt-2 mt-2 ml-3 flex" style={{ width: "90%" }}>
          <h1 className="text-gray-700 font-semibold text-sm font-sans">Look Up!</h1>
        </div>
        
        <div className=" w-80 h-80" onClick={(e) => {
          if(timer > 0){
            setFinding(!finding);
            handleStop();
          }else{
            setFinding(!finding);
            handleConnect()
          }
        }}>
          {timer > 0 && <p className="h-1 text-center text-lg">{formatTime(timer)}</p>}
          <Lottie animationData={loading} loop={finding} />
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

        
        <header className="py-2 mt-1" style={{width:"90%"}}>
          <h1 className=" text-gray-700 text-sm font-semibold">Preferences</h1>
        </header>
        <div className="w-full overflow-scroll flex flex-col items-center " style={{height: "50vh"}}>
          

          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 18,
            }}
            layout="horizontal"
            initialValues={{
              size: "small",
            }}
            bordered
            style={{
              width: "90%",
              margin: "1rem auto",
              textAlign: "!important left",
            }}
          >


            <Form.Item label="Find">
              <Select  >
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="none">None</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label="Level">
              <Select value={"Master"} >
                <Select.Option value="beginer">Beginner</Select.Option>
                <Select.Option value="expert">Expert</Select.Option>
                <Select.Option value="master">Master</Select.Option>
              </Select>
            </Form.Item>



            <button
              type="submit"
              className=" mt-2 flex mx-auto justify-center rounded-full bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              style={{ width: "50%" }}
              onClick={async () => {
               

              }}
            >
              Change
            </button>
          </Form>

        </div>
        
      </div>
      


    </div>
  );
}

export default FindMate;
