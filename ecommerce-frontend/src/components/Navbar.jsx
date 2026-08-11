import { NavLink, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { logout } from "../features/auth/authSlice";

function Navbar() {
  const user = useSelector((state) => state.auth.user);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    dispatch(logout());

    navigate("/login");
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "bg-blue-200 text-black px-3 py-1 rounded font-bold"
      : "hover:text-blue-300";

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        {/* Left Side */}
        <div className="flex gap-6 items-center">
          {isAuthenticated && user && (
            <span className="font-semibold text-yellow-300">{user.name}</span>
          )}

          <NavLink to="/" className={navLinkStyle}>
            Home
          </NavLink>

          {isAuthenticated && (
            <NavLink to="/products" className={navLinkStyle}>
              Products
            </NavLink>
          )}

          {user?.role === "ROLE_USER" && (
            <>
              <NavLink to="/cart" className={navLinkStyle}>
                Cart
              </NavLink>

              <NavLink to="/orders" className={navLinkStyle}>
                Orders
              </NavLink>
            </>
          )}

          {user?.role === "ROLE_ADMIN" && (
            <NavLink to="/admin" className={navLinkStyle}>
              Admin
            </NavLink>
          )}

          {!isAuthenticated && (
            <>
              <NavLink to="/login" className={navLinkStyle}>
                Login
              </NavLink>

              <NavLink to="/register" className={navLinkStyle}>
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Right Side */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="
              bg-red-500
              px-3
              py-1
              rounded
              hover:bg-red-600
            "
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
