package com.example.app.stock_management.repository;

import com.example.app.stock_management.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {
    Users findByEmail(String email);
    Users findByEmailAndPassword(String email, String password);

    @Query("SELECT u FROM Users u WHERE u.isDelete = false")
    List<Users> getAllActiveUsers();
}
