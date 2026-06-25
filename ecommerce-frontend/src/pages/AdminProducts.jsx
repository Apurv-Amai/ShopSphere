import { useEffect } from "react";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { getAllProducts, deleteProduct } from "../api/adminProductApi";

function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete Product ?");

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteProduct(id);

      alert("Product Deleted");

      fetchProducts();
    } catch (error) {
      console.log(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Cannot delete product because it exists in previous orders");
      }
    }
  };

  return (
    <div className="p-6">
      <div
        className="
          flex
          justify-between
          items-center
          mb-6
        "
      >
        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Product Management
        </h1>

        <button
          onClick={() => navigate("/admin/products/add")}
          className="
            bg-green-600
            text-white
            px-4
            py-2
            rounded
          "
        >
          Add Product
        </button>
      </div>

      {products.map((product) => (
        <div
          key={product.productId}
          className="
            border
            rounded-lg
            p-4
            mb-4
            shadow
          "
        >
          <h2
            className="
              text-xl
              font-bold
            "
          >
            {product.productName}
          </h2>

          <p>{product.description}</p>

          <p>Price : ₹{product.price}</p>

          <p>Stock :{product.quantity}</p>

          <p>Category :{product.category.categoryName}</p>

          <div
            className="
              flex
              gap-3
              mt-3
            "
          >
            <button
              onClick={() =>
                navigate(`/admin/products/edit/${product.productId}`)
              }
              className="
             bg-blue-500
             text-white
              px-4
              py-2
              rounded"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(product.productId)}
              className="
                bg-red-500
                text-white
                px-4
                py-2
                rounded
              "
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminProducts;
