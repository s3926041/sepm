import { Outlet } from "react-router";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import Login from "../Login";

function LoginPage() {
    return (
        <>
            <Header />
            <Login />
            <Footer />
            <Outlet />
        </>);
}

export default LoginPage;