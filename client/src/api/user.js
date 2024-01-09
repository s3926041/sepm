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

export const sendMessage = async (message) => {
  const data = {
    message,
  };
  console.log(data);
  try {
    const response = await fetch(API_URL + "/api/user/sendMessage/:id", {
      //Match ID
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

      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getOtherUser = async (id) => {
  try {
    const response = await fetch(API_URL + "/api/user/getother/" +id, {
      method: "GET",
      headers: headers(),
    });

    if (response.ok) {
      const data = await response.json();

      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getMatch = async (matchId) => {
  try {
    const response = await fetch(API_URL + "/api/user/match/" + matchId, {
      method: "GET",
      headers: headers(),
    });

    if (response.ok) {
      const data = await response.json();

      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getAllMatches = async () => {

  try {
    const response = await fetch(API_URL + "/api/user/matches/", {
      method: "GET",
      headers: headers(),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteMatch = async (matchId) => {
  try {
    const response = await fetch(API_URL + "/api/user/matches/" + matchId, {
      method: "DELETE",
      headers: headers(),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // Handle non-ok response, e.g., show an error message
      console.error(
        "Failed to delete match:",
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error during deleteMatch request:", error);
  }
};
