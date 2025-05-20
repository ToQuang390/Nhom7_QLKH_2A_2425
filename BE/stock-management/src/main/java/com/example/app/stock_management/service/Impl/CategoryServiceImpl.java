package com.example.app.stock_management.service.Impl;

import com.example.app.stock_management.dto.request.CategoryRequest;
import com.example.app.stock_management.dto.response.CategoryReponse;
import com.example.app.stock_management.entity.Category;
import com.example.app.stock_management.repository.CategoryRepository;
import com.example.app.stock_management.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public List<CategoryReponse> getAllCategories() {
        List<Category> categories = categoryRepository.getAllCategory();
        return categories.stream().map(this::convertToCategoryReponse).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CategoryReponse addCategory(CategoryRequest category) {
        Category categry= new Category();
        categry.setName(category.getName());
        categry.setCreatedAt(LocalDateTime.now());
        categry.setDescription(category.getDescription());
//        categry.setUpdateAt(category.getUpdateAt());
        categry.setIsdelete(category.isIsdelete());
        categoryRepository.save(categry);
        CategoryReponse categoryReponse = convertToCategoryReponse(categry);
        return categoryReponse;
    }




    @Override
    @Transactional
    public CategoryReponse updateCategory(CategoryRequest category) {
        Category ct =categoryRepository.findById(category.getId());
        ct.setName(category.getName());
        ct.setDescription(category.getDescription());
        CategoryReponse categoryReponse = convertToCategoryReponse(ct);
        return categoryReponse;
    }

    @Override
    @Transactional
    public Boolean deleteCategory(int id) {
        Category ct = categoryRepository.findById(id);
        ct.setIsdelete(true);
       Category c= categoryRepository.save(ct);
       if (c!=null) {
           return true;
       }
        return false;
    }


    @Override
    public CategoryReponse getCategoryById(int id) {
        Category ct = categoryRepository.findById(id);
        CategoryReponse categoryReponse = convertToCategoryReponse(ct);
        return categoryReponse;
    }

    private CategoryReponse convertToCategoryReponse(Category category) {
        CategoryReponse categoryReponse = new CategoryReponse();
        categoryReponse.setId(category.getId());
        categoryReponse.setName(category.getName());
        categoryReponse.setCreatedAt(category.getCreatedAt());
        categoryReponse.setDescription(category.getDescription());
//        categoryReponse.setUpdateAt(category.getUpdateAt());
        categoryReponse.setIsdelete(category.isIsdelete());
        return categoryReponse;
    }

}
