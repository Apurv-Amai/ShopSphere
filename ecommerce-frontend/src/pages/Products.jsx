import { useEffect } from "react";

import { useState } from "react";

import ProductCard from "../components/ProductCard";

import {
  getAllProducts,
  getProductsPage,
  searchProducts,
  getSortedProducts,
} from "../api/productApi";

function Products() {
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(0);

  const [keyword, setKeyword] = useState("");

  const [sortField, setSortField] = useState("");

  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      const response = await getProductsPage(page, 6);

      setProducts(response.data.content);

      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 403) {
        alert("Please Login First");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (keyword.trim() === "") {
      fetchProducts();

      return;
    }

    try {
      const response = await searchProducts(keyword);

      setProducts(response.data);

      setTotalPages(1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = async (field) => {
    try {
      const response = await getSortedProducts(field);

      setProducts(response.data);

      setSortField(field);

      setTotalPages(1);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <h2
        className="
                text-center
                mt-10
            "
      >
        Loading Products...
      </h2>
    );
  }

  return (
    <>
      <div
        className="
    flex
    justify-between
    items-center
    px-6
    mt-6
    mb-6
  "
      >
        <h1
          className="
      text-4xl
      font-bold
    "
        >
          Products
        </h1>

        <div
          className="
      flex
      gap-3
    "
        >
          <select
            value={sortField}
            onChange={(e) => handleSort(e.target.value)}
            className="
    border
    p-2
    rounded
  "
          >
            <option value="">Sort By</option>

            <option value="productName">Product Name</option>

            <option value="price">Price</option>

            <option value="quantity">Quantity</option>
          </select>

          <input
            type="text"
            placeholder="Search Products..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="
    border
    p-2
    rounded
    w-72
  "
          />

          <button
            onClick={handleSearch}
            className="
        bg-blue-600
        text-white
        px-4
        rounded
      "
          >
            Search
          </button>
        </div>
      </div>

      <div
        className="
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-3
    gap-6
    p-6
  "
      >
        {products.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>

      <div
        className="
    flex
    justify-center
    gap-4
    mb-8
  "
      >
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className="
      bg-blue-600
      text-white
      px-4
      py-2
      rounded
      disabled:bg-gray-400
    "
        >
          Previous
        </button>

        <span
          className="
      font-bold
      text-lg
    "
        >
          Page {page + 1} of {totalPages}
        </span>

        <button
          disabled={page === totalPages - 1}
          onClick={() => setPage(page + 1)}
          className="
      bg-blue-600
      text-white
      px-4
      py-2
      rounded
      disabled:bg-gray-400
    "
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Products;
