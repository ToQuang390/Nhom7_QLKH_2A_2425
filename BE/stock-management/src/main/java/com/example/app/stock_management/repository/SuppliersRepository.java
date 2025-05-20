package com.example.app.stock_management.repository;

import com.example.app.stock_management.entity.Customer;
import com.example.app.stock_management.entity.Suppliers;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface SuppliersRepository extends JpaRepository<Suppliers, Integer> {
    @Query("SELECT u FROM Suppliers u WHERE u.isDelete = false")
    List<Suppliers> getAllSupplier();

    @Query("SELECT u FROM Suppliers u WHERE u.isDelete = false")
    Page<Suppliers> findByIsDeleteFalse(Pageable pageable);

    @Query("SELECT u FROM Suppliers u WHERE u.supplier_name LIKE %:key% OR u.supplier_code LIKE %:key% and u.isDelete=false")
    Page<Suppliers> findBySAndSupplier_nameOrSAndSupplier_code(@Param("key") String key, Pageable pageable);
}
