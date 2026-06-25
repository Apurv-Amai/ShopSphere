package com.ecommerce.service;

import java.util.List;

import com.ecommerce.entity.Category;

public interface CategoryService {

    Category addCategory(Category category);

    List<Category> getAllCategories();

    Category getCategoryById(Long categoryId);

    Category updateCategory(Long categoryId, Category category);

    void deleteCategory(Long categoryId);
}