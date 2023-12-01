import { Outlet } from "react-router";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import Login from "../Login";

function LoginPage() {
    return ( 
    <>
        <Header />
        <Login />
        <Footer />
        <Outlet />
    </> );
}

export default LoginPage;