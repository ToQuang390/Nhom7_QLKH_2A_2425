package com.example.app.stock_management.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private int id;

//    @NotBlank(message = "Tên không được để trống ")
    private String username;
//    @NotBlank(message = "Mật khẩu không được để trống")
    private String password;

//    @NotBlank(message = "Email không được để trống")
//    @Email(message = "Email không đúng định dạng")
    private String email;

//    @Pattern(regexp = "^\\d{10,11}$", message = "Số điện thoại phải có 10 hoặc 11 chữ số")
    private String phone;

    private boolean active;
    private boolean delete;
    private LocalDateTime creatat;
    private LocalDateTime updateat;

    @Min(value = 1, message = "Role ID phải lớn hơn 0")
    private int roleId; // nhận vào id role
}
