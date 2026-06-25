import { useState } from "react";
import { useEffect } from "react";

import { addProduct } from "../api/adminProductApi";
import { getCategories } from "../api/categoryApi";

function AddProduct() {
  const [productName, setProductName] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState("");

  const [quantity, setQuantity] = useState("");

  const [categoryId, setCategoryId] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProduct(categoryId, {
        productName,
        description,
        price,
        quantity,
      });

      alert("Product Added Successfully");

      setProductName("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setCategoryId("");
    } catch (error) {
      console.log(error);

      alert("Failed To Add Product");
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
        Add Product
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
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border p-2"
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2"
        />

        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2"
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="border p-2"
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="
            bg-green-600
            text-white
            p-2
            rounded
          "
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
