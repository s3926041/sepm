import { useNavigate } from "react-router";
import { checkTokenExpiration, getUsers, isLoggedIn } from "../services/authService";
import { useEffect } from "react";

function CheckLogin() {
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuthentication = () => {
            try {
                if (isLoggedIn() === true) {
                    navigate("/lobby");
                }

            } catch (error) {
                console.error("An error occurred:", error);
                // Handle the error, e.g., redirect to an error page
            }
        };

        checkAuthentication();
    }, [navigate]);
    return (<></>)

}

export default CheckLogin;