import { useEffect } from "react";
import { useState } from "react";

import { getCategories, addCategory, deleteCategory } from "../api/categoryApi";

function AdminCategories() {
  const [categories, setCategories] = useState([]);

  const [categoryName, setCategoryName] = useState("");

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

  const handleAddCategory = async (e) => {
    e.preventDefault();

    try {
      await addCategory({
        categoryName,
      });

      alert("Category Added");

      setCategoryName("");

      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete Category ?");

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteCategory(id);

      alert("Category Deleted");

      fetchCategories();
    } catch (error) {
      console.log(error);

      alert("Cannot Delete Category");
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
        Category Management
      </h1>

      <form
        onSubmit={handleAddCategory}
        className="
          flex
          gap-4
          mb-6
        "
      >
        <input
          type="text"
          placeholder="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="
            border
            p-2
          "
        />

        <button
          type="submit"
          className="
            bg-green-600
            text-white
            px-4
            rounded
          "
        >
          Add Category
        </button>
      </form>

      {categories.map((category) => (
        <div
          key={category.categoryId}
          className="
              border
              p-4
              mb-3
              rounded
              flex
              justify-between
            "
        >
          <h2
            className="
                font-bold
                text-lg
              "
          >
            {category.categoryName}
          </h2>

          <button
            onClick={() => handleDelete(category.categoryId)}
            className="
                bg-red-500
                text-white
                px-4
                rounded
              "
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminCategories;
