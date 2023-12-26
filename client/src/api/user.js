import { API_URL } from "../GlobalVar";
import { headers } from "../services/authService";

export const updateProfile = async (data) => {
  console.log(data);
  try {
    const response = await fetch(API_URL + "/api/user/update", {
      method: "POST",
      headers: headers(),
      body: data,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async () => {
  try {
    const response = await fetch(API_URL + "/api/user/", {
      method: "GET",
      headers: headers(),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};
