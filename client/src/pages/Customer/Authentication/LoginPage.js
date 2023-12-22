import { Outlet } from "react-router";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import Login from "../Login";
import Authentication from "../../../components/Authentication";

function LoginPage() {
    return (
        <>
            {/* <Authentication /> */}
            <Header />
            <Login />
            <Footer />
            <Outlet />
        </>);
}

export default LoginPage;