import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

function Register() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!name.trim() || !email.trim() || !password.trim()) {
        alert("All fields are required");

        return;
      }

      await registerUser({
        name,

        email,

        password,
      });

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        const firstError = Object.values(error.response.data)[0];

        alert(firstError);
      }
    }
  };

  return (
    <div
      className="
            flex
            justify-center
            items-center
            h-screen
        "
    >
      <div
        className="
                w-96
                shadow-lg
                p-6
                rounded-lg
            "
      >
        <h2
          className="
                    text-2xl
                    font-bold
                    mb-5
                "
        >
          Register
        </h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="
                    border
                    w-full
                    p-2
                    mb-3
                    rounded
                "
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
                    border
                    w-full
                    p-2
                    mb-3
                    rounded
                "
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
          onClick={handleRegister}
          className="
                    bg-blue-500
                    text-white
                    w-full
                    p-2
                    rounded
                "
        >
          Register
        </button>

        <p className="mt-4 text-center">
          Already have an account?
          <span
            className="
        text-blue-500
        cursor-pointer
        ml-1
    "
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
