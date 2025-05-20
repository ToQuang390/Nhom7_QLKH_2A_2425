package com.example.app.stock_management.service;

import com.example.app.stock_management.dto.request.UserRequest;
import com.example.app.stock_management.dto.response.UserReponse;

import java.util.List;

public interface UserService  {
    List<UserReponse> getAllUsers();
    UserReponse getUserById(int id);
    UserReponse addUser(UserRequest user);
    UserReponse findByEmail(String email);
    UserReponse updateUser(UserRequest user);
    boolean deleteUser(int id);
    UserReponse updateInfor(int id,UserRequest user);
    UserReponse updatePassUser(UserRequest user);
}
