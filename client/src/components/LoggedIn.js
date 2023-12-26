import React, { useEffect } from "react";
import { checkTokenExpiration } from "../services/authService";
import { useParams } from "react-router";

function LoggedIn() {
    const id = useParams()
  useEffect(() => {
    const check = checkTokenExpiration();
  }, []);
  return <></>;
}

export default LoggedIn;
