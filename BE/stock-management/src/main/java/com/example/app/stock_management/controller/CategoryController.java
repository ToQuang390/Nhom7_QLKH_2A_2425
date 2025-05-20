package com.example.app.stock_management.controller;


import com.example.app.stock_management.dto.request.CategoryRequest;
import com.example.app.stock_management.dto.response.CategoryReponse;
import com.example.app.stock_management.entity.Category;
import com.example.app.stock_management.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    //lay danh sach danh muc
    @GetMapping
    public List<CategoryReponse> getAllCategories() {
        List<CategoryReponse> categories = categoryService.getAllCategories();
        return categories;
    }

    //them danh mục
    @PostMapping
    public CategoryReponse addCategory(@RequestBody CategoryRequest category) {
        CategoryReponse reponse=categoryService.addCategory(category);
        return reponse;
    }

    @PutMapping
    public CategoryReponse updateCategory(@RequestBody CategoryRequest category) {
        CategoryReponse reponse=categoryService.updateCategory(category);
        if (reponse==null)
            return null;
        else return reponse;
    }

    @DeleteMapping(value = "/{id}")
    public boolean deleteCategory(@PathVariable int id) {
        boolean reponse =categoryService.deleteCategory(id);
        return reponse;
    }



}
