package com.example.app.stock_management.service;

import com.example.app.stock_management.entity.Users;

public interface LoginService {
    Users login(String username, String password);
    Boolean resetPassword(String email);

}
