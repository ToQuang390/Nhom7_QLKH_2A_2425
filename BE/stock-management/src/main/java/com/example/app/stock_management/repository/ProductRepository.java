package com.example.app.stock_management.repository;

import com.example.app.stock_management.entity.Customer;
import com.example.app.stock_management.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
   @Query("select  u from Product u where u.isDelete =false ")
    List<Product> getAllProduct();

    @Query("select  u from Product u where u.isDelete =false ")
   Page<Product> findByIsDeleteFalse(Pageable pageable);

    @Query("SELECT u FROM Product u WHERE u.productCode LIKE %:key% OR u.name LIKE %:key%")
    Page<Product> findByNameAndProductCode(@Param("key") String key, Pageable pageable);

    Product findById(int id);

}
