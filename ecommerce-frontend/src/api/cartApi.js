import api from "./axiosConfig";

export const addToCart = (cartData) => {
  return api.post("/cart/add", cartData);
};

export const getCart = (userId) => {
  return api.get(`/cart/${userId}`);
};

export const getCartTotal = (userId) => {
  return api.get(`/cart/total/${userId}`);
};

export const updateCartItem = (cartItemId, quantity) => {
  return api.put(
    `/cart/update/${cartItemId}`,

    null,

    {
      params: {
        quantity,
      },
    },
  );
};

export const removeCartItem = (cartItemId) => {
  return api.delete(`/cart/remove/${cartItemId}`);
};
