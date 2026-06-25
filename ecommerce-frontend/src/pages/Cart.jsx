import { useEffect, useState } from "react";

import { checkout } from "../api/orderApi";

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import {
  getCart,
  getCartTotal,
  updateCartItem,
  removeCartItem,
} from "../api/cartApi";

function Cart() {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const [cart, setCart] = useState(null);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const cartResponse = await getCart(user.userId);

      setCart(cartResponse.data);

      const totalResponse = await getCartTotal(user.userId);

      setTotal(totalResponse.data);
    } catch (error) {
      console.log(error);

      setCart({
        cartItems: [],
      });

      setTotal(0);
    }
  };

  const handleCheckout = async () => {
    try {
      await checkout(user.userId);

      alert("Order Placed Successfully");

      navigate("/orders");
    } catch (error) {
      console.log(error);

      alert("Checkout Failed");
    }
  };

  const increaseQuantity = async (item) => {
    try {
      await updateCartItem(item.cartItemId, item.quantity + 1);

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseQuantity = async (item) => {
    try {
      if (item.quantity === 1) {
        await removeCartItem(item.cartItemId);
      } else {
        await updateCartItem(item.cartItemId, item.quantity - 1);
      }

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // IMPORTANT:
  // Conditional returns must come AFTER all hooks

  if (!user) {
    return <h2 className="text-center mt-10">Loading User...</h2>;
  }

  if (!cart) {
    return <h2 className="text-center mt-10">Loading Cart...</h2>;
  }

  if (cart.cartItems.length === 0) {
    return (
      <div className="text-center mt-10">
        <h2
          className="
          text-3xl
          font-bold
        "
        >
          Your Cart Is Empty
        </h2>

        <p
          className="
          text-gray-500
          mt-2
        "
        >
          Add products to start shopping.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      {cart.cartItems.length === 0 ? (
        <h2 className="text-xl font-semibold text-center">
          Your Cart Is Empty
        </h2>
      ) : (
        <>
          {cart.cartItems.map((item) => (
            <div
              key={item.cartItemId}
              className="
                border
                p-4
                mb-4
                rounded
              "
            >
              <h2
                className="
                  text-xl
                  font-bold
                "
              >
                {item.product.productName}
              </h2>

              <div
                className="
                  flex
                  items-center
                  gap-3
                  mt-2
                "
              >
                <button
                  onClick={() => decreaseQuantity(item)}
                  className="
                    bg-red-500
                    text-white
                    px-3
                    rounded
                  "
                >
                  -
                </button>

                <span
                  className="
                    font-bold
                    text-lg
                  "
                >
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item)}
                  className="
                    bg-green-500
                    text-white
                    px-3
                    rounded
                  "
                >
                  +
                </button>
              </div>

              <p className="mt-2">Price : ₹{item.product.price}</p>
            </div>
          ))}

          <h2
            className="
              text-2xl
              font-bold
              mt-6
            "
          >
            Total : ₹{total}
          </h2>

          <button
            onClick={handleCheckout}
            className="
              mt-4
              w-full
              bg-green-600
              text-white
              py-3
              rounded-lg
              hover:bg-green-700
            "
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
