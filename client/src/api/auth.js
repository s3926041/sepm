import { API_URL } from "../GlobalVar";

import { setToken, setUser } from "../services/authService";

const register = async (userData) => {
  try {
    const response = await fetch(API_URL + "/api/auth/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("ok");
      return data;
    }
    return null;
  } catch (error) {
    console.error("Error sending registration data:", error);
  }
};

const login = async (userData) => {
  console.log(userData);
  try {
    const response = await fetch(API_URL + "/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("ok");
      setUser(data);
      return data;
    }
    console.error("Login failed:", response.statusText);
    return null;
  } catch (error) {
    console.error("Error sending registration data:", error);
    return null;
  }
};

export { register, login };
