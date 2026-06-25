import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          onClick={() => navigate("/admin/products")}
          className="
            bg-blue-500
            text-white
            p-6
            rounded-xl
            shadow-lg
            cursor-pointer
            hover:scale-105
            transition
          "
        >
          <h2 className="text-2xl font-bold">Manage Products</h2>

          <p className="mt-2">Add, Update and Delete Products</p>
        </div>

        <div
          onClick={() => navigate("/admin/categories")}
          className="
            bg-green-500
            text-white
            p-6
            rounded-xl
            shadow-lg
            cursor-pointer
            hover:scale-105
            transition
          "
        >
          <h2 className="text-2xl font-bold">Manage Categories</h2>

          <p className="mt-2">Add and Manage Categories</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
