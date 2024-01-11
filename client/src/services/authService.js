import { jwtDecode } from "jwt-decode";

export const isLoggedIn = () => {
  let data = localStorage.getItem("user");
  return !!data;
};

export const getUsers = () => {
  let data = localStorage.getItem("user");
  if(data === null) {
    return null;
  }else{
    // alert()
    let user = JSON.parse(data);

    return user;
  }
};

export const setToken = (data) => {
  localStorage.setItem("token", JSON.stringify(data));
};

export const setUser = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const headers = () => {
  let token = JSON.parse(localStorage.getItem("user")).token;
  return {
    "Authorization": `Bearer ${token}`,
    // "Content-Type": "application/json",
  };
};

export const checkTokenExpiration = () => {
  const user = localStorage.getItem("user");
  if ( !user) {
    localStorage.removeItem("user");
    return false;
  }
  const decodedToken = jwtDecode(user?.token);
  const currentTime = Date.now() / 1000;

  if (decodedToken.exp < currentTime) {
    localStorage.removeItem("user");
    window.location.reload();
    return false;
  } else {
    const timeUntilExpiry = decodedToken.exp - currentTime;
    setTimeout(checkTokenExpiration, timeUntilExpiry * 1000);
    return true;
  }
};

export const formattedDate = (data) => {
  const date = new Date(data);

  return date.toLocaleString("en-US", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
};
