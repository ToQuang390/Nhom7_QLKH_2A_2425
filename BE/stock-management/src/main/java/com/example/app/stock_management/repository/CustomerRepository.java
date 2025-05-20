package com.example.app.stock_management.repository;

import com.example.app.stock_management.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    Customer findById(int id);

    @Query ("select u from Customer u where u.isdelete=false ")
    Page<Customer> findByIsdeleteFalse(Pageable pageable);

    @Query("SELECT u FROM Customer u WHERE (u.name LIKE %:key% OR u.phone LIKE %:key%) AND u.isdelete = false")
    Page<Customer> findByNameOrPhone(@Param("key") String key, Pageable pageable);
}
