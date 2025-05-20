package com.example.app.stock_management.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "suppliers")
public class Suppliers {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "supplier_code",length = 255)
    private String supplier_code;

    @Column(name = "supplier_name")
    private String supplier_name;

    @Column(name = "phone",length = 12)
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "address",length = 255)
    private String address;

    @Column(name = "isdelete")
    private boolean isDelete;

}
