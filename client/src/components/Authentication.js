import { useNavigate } from "react-router";
import {
  checkTokenExpiration,
  getUsers,
  isLoggedIn,
} from "../services/authService";
import { useEffect } from "react";

function Authentication() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuthentication = () => {
      try {
        if (checkTokenExpiration() === false) {
        //   console.log(checkTokenExpiration());
          navigate("/");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        // Handle the error, e.g., redirect to an error page
      }
    };

    checkAuthentication();
  }, [navigate]);
  return <></>;
}

export default Authentication;
