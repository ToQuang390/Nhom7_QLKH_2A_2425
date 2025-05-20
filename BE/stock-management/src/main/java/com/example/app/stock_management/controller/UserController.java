package com.example.app.stock_management.controller;


import com.example.app.stock_management.dto.request.UserRequest;
import com.example.app.stock_management.dto.response.UserReponse;
import com.example.app.stock_management.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/users")
@CrossOrigin("*")
public class UserController {


    @Autowired
    private UserService userService;


    @GetMapping
    public List<UserReponse> getUserList() {
        List<UserReponse> userReponseList=userService.getAllUsers();
        return userReponseList;
    }

    @GetMapping(value = {"/{id}"})
    public UserReponse getUserById(@PathVariable int id) {
        UserReponse userReponse=userService.getUserById(id);
        return  userReponse;
    }

    @PatchMapping(value = {"/{id}"})
    public UserReponse updateInfo(@PathVariable int id,@RequestBody UserRequest userRequest) {
        UserReponse userReponse=userService.updateInfor(id,userRequest);
        return  userReponse;
    }

    @PatchMapping(value = "/changepass")
    public UserReponse updatePassUser(@RequestBody UserRequest userRequest) {
        UserReponse userReponse=userService.updatePassUser(userRequest);
        return userReponse;
    }

    @PostMapping
    public ResponseEntity<?> addUser(@Valid @RequestBody UserRequest user, BindingResult bindingResult) {
        // Nếu có lỗi validate thì trả về lỗi
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(err -> {
                errors.put(err.getField(), err.getDefaultMessage());
            });
            return ResponseEntity.badRequest().body(errors);
        }
        // Không có lỗi, xử lý thêm user
        UserReponse userReponse = userService.addUser(user);
        return ResponseEntity.ok(userReponse);
    }

    @PutMapping
    public ResponseEntity<?> updateUser(@Valid @RequestBody UserRequest user, BindingResult bindingResult) {
        // Nếu có lỗi validate thì trả về lỗi
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(err -> {
                errors.put(err.getField(), err.getDefaultMessage());
            });
            return ResponseEntity.badRequest().body(errors);
        }
        UserReponse userReponse = userService.updateUser(user);
        return ResponseEntity.ok(userReponse);
    }

    @DeleteMapping(value = "/{ids}")
    public boolean deleteUser(@PathVariable int ids) {
       boolean isCheck= userService.deleteUser(ids);
        if (isCheck) {
            return true;
        } else {
            return false;
        }
    }



}
