import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div
      className="
        flex
        flex-col
        justify-center
        items-center
        h-screen
        bg-gray-100
      "
    >
      {!isAuthenticated ? (
        <>
          <h1
            className="
          text-5xl
          font-bold
          mb-4
        "
          >
            Welcome To ShopSphere Store
          </h1>

          <p
            className="
          text-lg
          text-gray-600
          mb-8
        "
          >
            Please Login or Register to explore products, manage your cart and
            place orders.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-lg
          "
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="
            bg-blue-600
            text-white
            px-6
            py-3
            rounded-lg
          "
            >
              Register
            </button>
          </div>
        </>
      ) : (
        <>
          {user?.role === "ROLE_ADMIN" ? (
            <>
              <h1
                className="
          text-5xl
          font-bold
          mb-4
        "
              >
                Welcome Back, Admin {user?.name} 👨‍💼
              </h1>

              <p
                className="
          text-lg
          text-gray-600
          mb-8
        "
              >
                Manage products, categories and store operations from the admin
                dashboard.
              </p>

              <button
                onClick={() => navigate("/admin")}
                className="
          bg-purple-600
          text-white
          px-8
          py-3
          rounded-lg
          hover:bg-purple-700
        "
              >
                Go To Admin Dashboard
              </button>
            </>
          ) : (
            <>
              <h1
                className="
          text-5xl
          font-bold
          mb-4
        "
              >
                Welcome Back, {user?.name} 👋
              </h1>

              <p
                className="
          text-lg
          text-gray-600
          mb-8
        "
              >
                Explore products, manage your cart and track your orders.
              </p>

              <button
                onClick={() => navigate("/products")}
                className="
          bg-blue-600
          text-white
          px-8
          py-3
          rounded-lg
          hover:bg-blue-700
        "
              >
                Explore Products
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
