package com.example.app.stock_management.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name",nullable = false,length = 255)
    private String name;

    @Column(name = "phone",length = 20)
    private String phone;
    
    @Column(name = "email")
    private String email;

    @Column(name = "address",length = 255)
    private String address;

    @Column(name = "isdelete")
    private boolean isdelete;


}
