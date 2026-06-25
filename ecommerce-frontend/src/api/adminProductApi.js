import api from "./axiosConfig";

export const addProduct = (categoryId, productData) => {
  return api.post(`/products/${categoryId}`, productData);
};

export const getAllProducts = () => {
  return api.get("/products");
};

export const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};

export const updateProduct = (id, productData) => {
  return api.put(`/products/${id}`, productData);
};
