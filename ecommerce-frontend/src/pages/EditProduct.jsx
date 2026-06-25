import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import api from "../api/axiosConfig";

import { updateProduct } from "../api/adminProductApi";

function EditProduct() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [productName, setProductName] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);

      const product = response.data;

      setProductName(product.productName);

      setDescription(product.description);

      setPrice(product.price);

      setQuantity(product.quantity);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProduct(id, {
        productName,
        description,
        price,
        quantity,
      });

      alert("Product Updated Successfully");

      navigate("/admin/products");
    } catch (error) {
      console.log(error);

      alert("Update Failed");
    }
  };

  return (
    <div className="p-6">
      <h1
        className="
          text-4xl
          font-bold
          mb-6
        "
      >
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
          flex
          flex-col
          gap-4
          max-w-md
        "
      >
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border p-2"
        />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2"
        />

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2"
        />

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2"
        />

        <button
          type="submit"
          className="
            bg-blue-600
            text-white
            p-2
            rounded
          "
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
