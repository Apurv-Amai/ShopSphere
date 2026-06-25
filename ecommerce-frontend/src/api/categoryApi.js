import api from "./axiosConfig";

export const getCategories = () => {
  return api.get("/categories");
};

export const addCategory = (category) => {
  return api.post("/categories", category);
};

export const updateCategory = (id, category) => {
  return api.put(`/categories/${id}`, category);
};

export const deleteCategory = (id) => {
  return api.delete(`/categories/${id}`);
};
