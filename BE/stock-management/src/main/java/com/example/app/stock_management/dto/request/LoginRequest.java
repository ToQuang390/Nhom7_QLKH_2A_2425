package com.example.app.stock_management.dto.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
