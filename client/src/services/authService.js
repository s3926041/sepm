import { jwtDecode } from "jwt-decode";

export const isLoggedIn = () => {
  let data = localStorage.getItem("token");
  return !!data;
};

export const getUsers = () => {
  let data = localStorage.getItem("user");
  let user = JSON.parse(data);
  // console.log(data);
  return user;
};

export const setToken = (data) => {
  localStorage.setItem("token", JSON.stringify(data));
};

export const setUser = (data) => {
  // console.log(data);
  localStorage.setItem("user", JSON.stringify(data));
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const headers = () => {
  let token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const checkTokenExpiration = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (!token || !user) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return false;
  }
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  if (decodedToken.exp < currentTime) {
    localStorage.removeItem("token");
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
