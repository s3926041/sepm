import './App.css';
import './output.css';
import SafetyPage from './pages/Customer/SafetyPage/SafetyPage';
import LoginPage from './pages/Customer/Authentication/LoginPage';
import EditProfilePage from './pages/Customer/EditProfilePage/EditProfilePage';
import RegisterPage from './pages/Customer/Authentication/RegisterPage';
import PaymentPage from './pages/Customer/PaymentPage/PaymentPage';
import PricePage from './pages/Customer/PaymentPage/PricePage';
import HomePage from './pages/Customer/HomePage/HomePage';
import Admin from './pages/Admin/admin';
import Error from './pages/404/Error';
import LobbyPage from "./pages/Customer/Lobby/LobbyPage"
import ChatBox from './pages/Customer/Lobby/ChatBox';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatSideBar from './pages/Customer/Lobby/ChatSideBar';
// import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LobbyPage/>,
      children: [    
      ],
      errorElement: <Error/>,
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
      path: "/user/editprofile",
      element: <EditProfilePage />,
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
// return(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<HomePage />}>
//         {/* <Route index element={<HomePage/>} /> */}
//         <Route path="login" element={<LoginPage />} />
//         <Route path="safety" element={<SafetyPage />} />
//         <Route path="*" element={<Error />} />
//       </Route>
//     </Routes>
//   </BrowserRouter>
// );
}

export default App;
