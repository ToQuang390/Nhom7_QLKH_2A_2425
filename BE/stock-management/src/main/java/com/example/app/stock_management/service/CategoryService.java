package com.example.app.stock_management.service;

import com.example.app.stock_management.dto.request.CategoryRequest;
import com.example.app.stock_management.dto.response.CategoryReponse;
import com.example.app.stock_management.entity.Category;

import java.util.List;

public interface CategoryService {
    List<CategoryReponse> getAllCategories();
    CategoryReponse addCategory(CategoryRequest category);
    CategoryReponse updateCategory(CategoryRequest category);
    Boolean deleteCategory(int  id);
    CategoryReponse getCategoryById(int id);
}
