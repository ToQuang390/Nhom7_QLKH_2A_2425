package com.example.app.stock_management.dto.response;

import com.example.app.stock_management.entity.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserReponse {

    private int id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private boolean active;
    private boolean delete;
    //dùng json Format để định daạng ngày giờ
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime creatAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateAt;
    private String role; // tên Role


}
