package com.example.app.stock_management.controller;

import com.example.app.stock_management.dto.common.ResponseData;
import com.example.app.stock_management.dto.request.LoginRequest;
import com.example.app.stock_management.entity.Users;
import com.example.app.stock_management.service.LoginService;
import com.example.app.stock_management.utils.JwtUtilHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.Repository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/login")
public class LoginController {
    
    @Autowired
    LoginService loginService;

    @Autowired
    JwtUtilHelper jwtUtilHelper;

    //Login
    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody LoginRequest loginRequest) {
        
        ResponseData responseData=new ResponseData();
       Users users= loginService.login(loginRequest.getEmail(), loginRequest.getPassword());

        if(users!=null) {
            String token=jwtUtilHelper.generateToken(users.getEmail(), String.valueOf(users.getId())
                    ,users.getUsername(),users.getRole().getName(),users.isActive());
            responseData.setData(token);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }else{
            responseData.setStatus(HttpStatus.NOT_FOUND.value());
            responseData.setData("");
            responseData.setSuccess(false);
            return new ResponseEntity<>(responseData, HttpStatus.NOT_FOUND);
        }
    }

    //reset mật khẩu
    @PostMapping("/reset")
    public ResponseEntity<?> resetPass(@RequestParam("email") String email) {
        boolean isCheck= loginService.resetPassword(email);
        ResponseData responseData=new ResponseData();
        if(isCheck) {
            responseData.setStatus(HttpStatus.OK.value());
            responseData.setSuccess(true);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        }
            responseData.setStatus(HttpStatus.NOT_FOUND.value());
            responseData.setData("");
            responseData.setSuccess(false);
            return new ResponseEntity<>(responseData, HttpStatus.NOT_FOUND);

    }


//    @PostMapping("/signin")
//    public ResponseEntity<?> signin(@RequestBody LoginRequest loginRequest) {
//        ResponseData responseData=new ResponseData();
//
//        if(loginService.login(loginRequest.getEmail(), loginRequest.getPassword())) {
//
//            String token=jwtUtilHelper.generateToken(loginRequest.getEmail());
//            responseData.setData(token);
//            return new ResponseEntity<>(responseData, HttpStatus.OK);
//        }else{
//            responseData.setStatus(HttpStatus.NOT_FOUND.value());
//            responseData.setData("");
//            responseData.setSuccess(false);
//            return new ResponseEntity<>(responseData, HttpStatus.NOT_FOUND);
//        }
//    }


}
