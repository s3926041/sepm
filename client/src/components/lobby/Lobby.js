// Lobby.js
import React, { useEffect, useState } from "react";
import { getUsers } from "../../service/authService";
import { useNavigate } from "react-router";

function Lobby({ socketManager }) {
  const [user, setUser] = useState(getUsers().user);
  const [finding, setFinding] = useState(false);
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

  return (
    <div>
      <h2>Lobby</h2>
      <form>
        {/* Add your match preferences input fields */}
        <label>Skill Level:</label>
        <input
          type="text"
          value={matchPreferences.skillLevel}
          onChange={(e) =>
            setMatchPreferences({
              ...matchPreferences,
              skillLevel: e.target.value,
            })
          }
        />
        <br />
        <label>Game Mode:</label>
        <input
          type="text"
          value={matchPreferences.gameMode}
          onChange={(e) =>
            setMatchPreferences({
              ...matchPreferences,
              gameMode: e.target.value,
            })
          }
        />
        {/* Add other preference fields as needed */}
        <br />
        {!finding && (
          <button type="button" onClick={handleConnect}>
            Connect to Queue
          </button>
        )}
        {finding && (
          <button type="button" onClick={handleStop}>
            Stop
          </button>
        )}
      </form>
    </div>
  );
}

export default Lobby;
