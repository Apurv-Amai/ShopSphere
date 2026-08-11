import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    restoreLogin,
    setUser,
    finishLoading,
} from "../features/auth/authSlice";

import { getProfile } from "../api/userApi";

function OAuth2Callback() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        const handleOAuth2Login = async () => {

            // Get token from URL fragment
            const hash = window.location.hash;

            const params = new URLSearchParams(
                hash.substring(1)
            );

            const token = params.get("token");

            // No token received
            if (!token) {

                dispatch(finishLoading());

                navigate("/login", {
                    replace: true,
                });

                return;
            }

            try {

                // Store JWT
                localStorage.setItem(
                    "token",
                    token
                );

                // Update Redux authentication state
                dispatch(restoreLogin(token));

                // Get logged-in user from backend
                const response = await getProfile();

                // Store user in Redux
                dispatch(setUser(response.data));

                // Remove token from URL
                window.history.replaceState(
                    null,
                    "",
                    "/oauth2/callback"
                );

                // Go to home
                navigate("/", {
                    replace: true,
                });

            } catch (error) {

                console.error(
                    "OAuth2 login failed:",
                    error
                );

                localStorage.removeItem("token");

                dispatch(finishLoading());

                navigate("/login", {
                    replace: true,
                });
            }
        };

        handleOAuth2Login();

    }, [dispatch, navigate]);

    return <p>Signing you in...</p>;
}

export default OAuth2Callback;