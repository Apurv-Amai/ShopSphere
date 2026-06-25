import api from "./axiosConfig";

export const getAllProducts = () => {
  return api.get("/products");
};

export const getProductsPage = (page, size) => {
  return api.get(`/products/page?page=${page}&size=${size}`);
};

export const searchProducts = (keyword) => {
  return api.get(`/products/search?keyword=${keyword}`);
};

export const getSortedProducts = (field) => {
  return api.get(`/products/sort?field=${field}`);
};
