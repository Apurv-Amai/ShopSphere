import api from "./axiosConfig";

export const checkout = (userId) => {

  return api.post(
    `/orders/checkout/${userId}`
  );
};

export const getOrders = (userId) => {

  return api.get(
    `/orders/${userId}`
  );
};