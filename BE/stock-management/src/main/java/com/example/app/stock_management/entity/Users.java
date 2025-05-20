package com.example.app.stock_management.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "username",length = 50)
    private String username;

    @Column(name = "password",columnDefinition = "TEXT")
    private String password;

    @Column(name = "email",length = 100)
    private String email;

    @Column(name = "phone",length = 15)
    private String phone;

    @Column(name = "active")
    private boolean active;

    @Column(name = "isdelete")
    private boolean isDelete;

    @Column(name = "creatat")
    private LocalDateTime creatAt;

    @Column(name = "updateat")
    private LocalDateTime updateAt;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private Role role;

    @OneToMany(mappedBy = "user")
    private List<Import> imports;

    @OneToMany(mappedBy = "user")
    private List<Export> exports;
}
