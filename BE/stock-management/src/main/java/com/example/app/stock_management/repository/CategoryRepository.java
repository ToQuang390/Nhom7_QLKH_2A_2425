package com.example.app.stock_management.repository;

import com.example.app.stock_management.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query("select u from Category u where u.isdelete=false ")
    List<Category> getAllCategory();
    Category findById(int id);
}

