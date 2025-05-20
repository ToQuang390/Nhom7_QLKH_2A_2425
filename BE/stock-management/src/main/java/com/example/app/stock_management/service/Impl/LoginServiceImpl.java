package com.example.app.stock_management.service.Impl;

import com.example.app.stock_management.entity.Users;
import com.example.app.stock_management.repository.UserRepository;
import com.example.app.stock_management.service.EmailService;
import com.example.app.stock_management.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;


@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;


    //    @Override
//    public boolean login(String username, String password) {
//
//        Users users=userRepository.findByEmail(username);
//        //so sánh mật khẩu người dùng nhập với mật khẩu trong database
//       return passwordEncoder.matches(password,users.getPassword());
//    }
    @Override
    public Users login(String username, String password) {
        Users users = userRepository.findByEmail(username);
        if (users != null && passwordEncoder.matches(password, users.getPassword())) {
            return users;
        }
        return null;
    }

    @Override
    public Boolean resetPassword(String email) {
        Users users = userRepository.findByEmail(email);
        if (users != null) {
            String newPassword = generateRandomPassword(10);
            users.setPassword(passwordEncoder.encode(newPassword));
          String username=users.getUsername();
            userRepository.save(users);
            guiEmailKichHoat(email, username,newPassword);
            return true;
        }
        return false;
    }

    private void guiEmailKichHoat(String email,String username,String newPassword){
        String subject="Kích hoạt thay đổi mật khẩu GF STOCK ";
        String text = "<html><body><p>Xin chào "+username+",</p><p>Mật khẩu mới cho tài khoản <b>"
                + email + "</b> là:</p><h2>" + newPassword + "</h2><p>Vui lòng đăng nhập và thay đổi mật khẩu ngay.</p></body></html>";
        emailService.sendMessage(email,subject,text);
    }

    private String generateRandomPassword(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }
}

