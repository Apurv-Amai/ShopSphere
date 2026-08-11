import { useState } from "react";
import api from "../api/axiosConfig";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import { getProfile } from "../api/userApi";

import { setUser } from "../features/auth/authSlice";

function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const token = response.data.token;

      dispatch(loginSuccess(token));

      localStorage.setItem("token", token);

      const profileResponse = await getProfile();

      dispatch(setUser(profileResponse.data));

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      console.log(error);

      const data = error.response?.data;

      if (data?.message) {
        alert(data.message);
      } else {
        alert("Login Failed");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-5">Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
        />

        <div className="relative mb-3">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
      border
      w-full
      p-2
      rounded
    "
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
      absolute
      right-3
      top-2
    "
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Login
        </button>

        <div className="flex items-center my-4">
          <div className="flex-1 border-t"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t"></div>
        </div>

        <button
          type="button"
          onClick={() => {
            window.location.href =
              "http://localhost:8080/oauth2/authorization/google";
          }}
          className="border w-full p-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100"
        >
          <span className="font-bold text-lg">G</span>
          Continue with Google
        </button>

        <p className="mt-4 text-center">
          Don't have an account?
          <span
            className="
        text-blue-500
        cursor-pointer
        ml-1
    "
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
