import { useEffect, useState } from "react";

import { getOrders } from "../api/orderApi";

import { useSelector } from "react-redux";

function Orders() {
  const user = useSelector((state) => state.auth.user);

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await getOrders(user.userId);

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // IMPORTANT:
  // Hooks first, then conditional returns

  if (!user) {
    return <h2 className="text-center mt-10">Loading User...</h2>;
  }

  if (loading) {
    return <h2 className="text-center mt-10">Loading Orders...</h2>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1
        className="
          text-4xl
          font-bold
          mb-8
        "
      >
        My Orders
      </h1>

      {orders.length === 0 ? (
        <h2 className="text-center text-xl">No Orders Found</h2>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="
                bg-white
                rounded-xl
                shadow-lg
                p-6
              "
            >
              <div
                className="
                  flex
                  justify-between
                  items-center
                  mb-4
                "
              >
                <div>
                  <h2
                    className="
                      text-2xl
                      font-bold
                    "
                  >
                    Order #{order.orderId}
                  </h2>

                  <p className="text-gray-500">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className="
                    bg-green-100
                    text-green-700
                    px-3
                    py-1
                    rounded-full
                    font-semibold
                  "
                >
                  {order.status}
                </span>
              </div>

              <hr className="mb-4" />

              {order.orderItems.map((item) => (
                <div
                  key={item.orderItemId}
                  className="
                    flex
                    justify-between
                    items-center
                    py-3
                  "
                >
                  <div>
                    <h3
                      className="
                        font-semibold
                        text-lg
                      "
                    >
                      {item.product.productName}
                    </h3>

                    <p className="text-gray-600">Quantity : {item.quantity}</p>
                  </div>

                  <div
                    className="
                      text-green-600
                      font-bold
                    "
                  >
                    ₹ {item.price}
                  </div>
                </div>
              ))}

              <hr className="my-4" />

              <div
                className="
                  flex
                  justify-end
                "
              >
                <h3
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  Total : ₹ {order.totalAmount}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
