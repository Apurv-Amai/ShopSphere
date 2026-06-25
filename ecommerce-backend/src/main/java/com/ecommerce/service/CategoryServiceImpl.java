package com.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecommerce.entity.Category;
import com.ecommerce.exception.CategoryNotFoundException;
import com.ecommerce.repository.CategoryRepository;

@Service
public class CategoryServiceImpl
        implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category addCategory(Category category) {

        return categoryRepository.save(category);
    }

    @Override
    public List<Category> getAllCategories() {

        return categoryRepository.findAll();
    }

    @Override
    public Category getCategoryById(Long categoryId) {

        return categoryRepository.findById(categoryId)
                .orElseThrow(() ->
                        new CategoryNotFoundException(
                                "Category Not Found With Id : "
                                        + categoryId));
    }

    @Override
    public Category updateCategory(Long categoryId,
                                   Category category) {

        Category existingCategory =
                categoryRepository.findById(categoryId)
                        .orElseThrow(() ->
                                new CategoryNotFoundException(
                                        "Category Not Found With Id : "
                                                + categoryId));

        existingCategory.setCategoryName(
                category.getCategoryName());

        return categoryRepository.save(existingCategory);
    }

    @Override
    public void deleteCategory(Long categoryId) {

        Category category =
                categoryRepository.findById(categoryId)
                        .orElseThrow(() ->
                                new CategoryNotFoundException(
                                        "Category Not Found With Id : "
                                                + categoryId));

        categoryRepository.delete(category);
    }
}