import { addToCart } from "../api/cartApi";

import { useSelector } from "react-redux";

function ProductCard({ product }) {
  const productImage = "https://via.placeholder.com/300x200";

  const user = useSelector((state) => state.auth.user);

  const isAdmin = user?.role === "ROLE_ADMIN";

  const handleAddToCart = async () => {
    console.log(localStorage.getItem("token"));

    try {
      await addToCart({
        userId: user.userId,

        productId: product.productId,

        quantity: 1,
      });

      alert("Added To Cart");
    } catch (error) {
      console.log(error);

      alert("Failed To Add Cart");
    }
  };

  return (
    <div
      className="
      bg-white
      rounded-xl
      shadow-md
      overflow-hidden
      hover:shadow-xl
      transition
      duration-300
    "
    >
      <img
        src={productImage}
        alt={product.productName}
        className="
        w-full
        h-48
        object-cover
      "
      />

      <div className="p-4">
        <h2
          className="
          text-xl
          font-bold
          mb-2
        "
        >
          {product.productName}
        </h2>

        <p
          className="
          text-gray-600
          mb-2
        "
        >
          {product.description}
        </p>

        <div
          className="
          flex
          justify-between
          mb-2
        "
        >
          <span
            className="
            bg-blue-100
            text-blue-700
            px-2
            py-1
            rounded
            text-sm
          "
          >
            {product.category.categoryName}
          </span>

          <span
            className="
            bg-green-100
            text-green-700
            px-2
            py-1
            rounded
            text-sm
          "
          >
            Stock: {product.quantity}
          </span>
        </div>

        <p
          className="
          text-2xl
          font-bold
          text-green-600
          mb-4
        "
        >
          ₹ {product.price}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={isAdmin}
          className={`
    w-full
    py-2
    rounded-lg
    text-white
    ${
      isAdmin
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    }
  `}
        >
          {isAdmin ? "Admin View Only" : "Add To Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
