import { useEffect } from "react";

import { useDispatch } from "react-redux";

import Navbar from "./components/Navbar";

import AppRoutes from "./routes/AppRoutes";

import {
  restoreLogin,
  setUser,
  logout,
  finishLoading,
} from "./features/auth/authSlice";

import { getProfile } from "./api/userApi";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        dispatch(finishLoading());

        return;
      }

      try {
        dispatch(restoreLogin(token));

        const response = await getProfile();

        dispatch(setUser(response.data));
      } catch {
        localStorage.removeItem("token");

        dispatch(finishLoading());
      }
    };

    restoreUser();
  }, [dispatch]);

  return (
    <>
      <Navbar />

      <AppRoutes />
    </>
  );
}

export default App;
