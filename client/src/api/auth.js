import { API_URL } from "../GlobalVar";

import { setToken, setUser } from "../services/authService";

const register = async (userData, formData) => {
  try {
    for (const key in userData) {
      formData.append(key, userData[key]);
    }
    console.log(formData);
    const response = await fetch(API_URL + "/api/auth/register/", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Registration successful");
      return data;
    } else {
      console.error("Registration failed:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error sending registration data:", error);
    return null;
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
