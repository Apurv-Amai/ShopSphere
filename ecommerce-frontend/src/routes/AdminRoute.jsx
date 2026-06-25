import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

function AdminRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <h2
        className="
          text-center
          mt-10
        "
      >
        Loading...
      </h2>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "ROLE_ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;
