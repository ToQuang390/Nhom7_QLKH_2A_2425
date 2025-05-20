package com.example.app.stock_management.security;

import com.example.app.stock_management.entity.Users;
import com.example.app.stock_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomerUserDetailService implements UserDetailsService {

    //custom lấy thông tin nguời dùng và mật khẩu từ database
    // xong trả về đối tượng kiểu userDetail service của hệ thống
    @Autowired
    UserRepository userRepository;
    //customer autoprovider
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users user = userRepository.findByEmail(email);
       if (user == null) {
            throw new UsernameNotFoundException(email);
        }
        return new User(user.getUsername(), user.getPassword(), new ArrayList<>());
    }


}
