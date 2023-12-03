import { API_URL } from "../GlobalVar";
import { setToken, setUser } from "../service/authService";

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
  } catch (error) {
    console.error("Error sending registration data:", error);
  }
};

const login = async (userData) => {
  // alert(userData);
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
    } else {
      console.error("Login failed:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error sending registration data:", error);
    return null;
  }
};

export { register, login };
