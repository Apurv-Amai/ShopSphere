import api from "./axiosConfig";

export const getProfile = () => {
  return api.get("/users/profile");
};
