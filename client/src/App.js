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
import ChatPage from "./pages/Customer/Lobby/ChatPage";



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
      element: <LobbyPage  />,
    },
    {
      path: "/lobby/chat/:chatid",
      element: <ChatPage  />,
    },
    {
      path: "/aboutus",
      element: <AboutPage />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
