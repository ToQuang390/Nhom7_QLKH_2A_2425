package com.example.app.stock_management.service.Impl;

import com.example.app.stock_management.dto.request.UserRequest;
import com.example.app.stock_management.dto.response.UserReponse;
import com.example.app.stock_management.entity.Role;

import com.example.app.stock_management.entity.Users;
import com.example.app.stock_management.repository.RoleRepository;
import com.example.app.stock_management.repository.UserRepository;
import com.example.app.stock_management.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;




    @Override
    public List<UserReponse> getAllUsers() {
        List<Users> users = userRepository.getAllActiveUsers();
        return users.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
    @Override
    public UserReponse getUserById(int id) {
        Users user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        UserReponse userReponse =
                new UserReponse(user.getId(),
                        user.getUsername(),
                        user.getPassword(),user.getEmail(),user.getPhone(),
                        user.isActive(),
                        user.isDelete(),
                        user.getCreatAt(),
                        user.getUpdateAt(),
                        user.getRole().getName());
        return userReponse;
    }

    @Override
    public UserReponse updateInfor(int id,UserRequest user) {
        Users userrep = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userrep.setUsername(user.getUsername());
        userrep.setEmail(user.getEmail());
        userrep.setPhone(user.getPhone());
        UserReponse reponse =convertToDTO(userRepository.save(userrep));
        return reponse;
    }

    @Override
    public UserReponse updatePassUser(UserRequest user) {
        Users userrep = userRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        userrep.setPassword(passwordEncoder.encode(user.getPassword()));
        UserReponse reponse =convertToDTO(userRepository.save(userrep));
        return reponse;
    }

    @Override
    public UserReponse findByEmail(String email) {

        return null;
    }

    @Override
    public UserReponse updateUser(UserRequest user) {
        Users userrep = userRepository.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        userrep.setUsername(user.getUsername());
        userrep.setEmail(user.getEmail());
        userrep.setPhone(user.getPhone());
        userrep.setActive(user.isActive());
        userrep.setUpdateAt(LocalDateTime.now());
        Role role = roleRepository.findById(user.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));
        userrep.setRole(role);
        UserReponse reponse =convertToDTO(userRepository.save(userrep));
        return reponse;
    }

    @Override
    @Transactional
    public UserReponse addUser(UserRequest user) {
        Users newUser = new Users();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setEmail(user.getEmail());
        newUser.setPhone(user.getPhone());
        newUser.setActive(user.isActive());
        newUser.setDelete(user.isDelete());
        newUser.setCreatAt(LocalDateTime.now());
        newUser.setUpdateAt(user.getUpdateat());

        Role role = roleRepository.findById(user.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));
        newUser.setRole(role);
         Users userReponse=  userRepository.saveAndFlush(newUser);
        return convertToDTO(userReponse);
    }

    //xóa người dùng


    @Override
    public boolean deleteUser(int id) {
        Users userrep = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userrep.setDelete(true);
        Users userreps = userRepository.saveAndFlush(userrep);
        if (userreps != null){
                return true;
        }
        return false;
    }

    private UserReponse convertToDTO(Users user) {
        UserReponse dto = new UserReponse();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setPassword(user.getPassword());
        dto.setEmail(user.getEmail());
        dto.setDelete(user.isDelete());
        dto.setActive(user.isActive());
        dto.setPhone(user.getPhone());
        dto.setCreatAt(user.getCreatAt());
        dto.setUpdateAt(user.getUpdateAt());
        dto.setRole(user.getRole().getName()); // Lấy ID thay vì toàn bộ Role object
        return dto;
    }











}
