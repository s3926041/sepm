import "./App.css";
import "./output.css";
import SafetyPage from "./pages/Customer/SafetyPage/SafetyPage";
import LoginPage from "./pages/Customer/Authentication/LoginPage";
// import EditProfilePage from "./pages/Customer/EditProfilePage/EditProfilePage";
import RegisterPage from "./pages/Customer/Authentication/RegisterPage";
import PaymentPage from "./pages/Customer/PaymentPage/PaymentPage";
import PricePage from "./pages/Customer/PaymentPage/PricePage";
import HomePage from "./pages/Customer/HomePage/HomePage";
import Admin from "./pages/Admin/admin";
import Error from "./pages/404/Error";
import LobbyPage from "./pages/Customer/Lobby/LobbyPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutPage from "./pages/Customer/HomePage/AboutPage";
import { API_URL } from "./GlobalVar";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import ChatPage from "./pages/Customer/Lobby/ChatPage";

const socket = io(API_URL, {
  withCredentials: true,
});

const socketManager = {
  connectToQueue: (matchPreferences) => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit("connectToQueue", matchPreferences);
  },

  disconnect: () => {
    if (socket.connected) {
      socket.disconnect();
    }
  },

  onMatchFound: (callback) => {
    socket.on("matchFound", callback);
  },

  offMatchFound: (callback) => {
    socket.off("matchFound", callback);
  },

  sendGlobalChatMessage: (message) => {
    if (socket.connected) {
      socket.emit("globalChatMessage", { message });
    }
  },

  sendPrivateChatMessage: (chatid, message) => {
      if(socket.connected){
        socket.emit("privateChatMessage", {matchId: chatid, message: message});
      }
  },

  // Function to receive global chat messages
  onPrivateChatMessage: (callback) => {
    socket.on("privateChatMessage", callback);
  },

  // Function to stop listening to global chat messages
  offPrivateChatMessage: (callback) => {
    socket.off("privateChatMessage", callback);
  },

  // Function to receive global chat messages
  onGlobalChatMessage: (callback) => {
    socket.on("globalChatMessage", callback);
  },

  // Function to stop listening to global chat messages
  offGlobalChatMessage: (callback) => {
    socket.off("globalChatMessage", callback);
  },
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      children: [],
      errorElement: <Error />,
    },
    {
      path: "/safety",
      element: <SafetyPage />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/createprofile",
      element: <RegisterPage />,
    },
    {
      path: "/pricing",
      element: <PricePage />,
    },
    {
      path: "/pricing/payment",
      element: <PaymentPage />,
    },
    {
      path: "/lobby",
      element: <LobbyPage socketManager={socketManager} />,
      
    },
    {
      path: "/lobby/chat/:chatid",
      element: <ChatPage socketManager={socketManager} />
    },
    {
      path: "/aboutus",
      element: <AboutPage />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
