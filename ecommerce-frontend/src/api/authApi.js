import api from "./axiosConfig";

export const registerUser = (userData) => {

    return api.post(
        "/users/register",
        userData
    );
};

export const loginUser = (loginData) => {

    return api.post(
        "/auth/login",
        loginData
    );
};