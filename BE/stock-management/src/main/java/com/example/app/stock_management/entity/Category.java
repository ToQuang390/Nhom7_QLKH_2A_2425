package com.example.app.stock_management.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "category")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "isdelete")
    private boolean isdelete=false;

    @Column(name = "name",length = 100)
    private String name;

//    @Column(name = "code",length = 255)
//    private String code;

    @Column(name = "description",length = 255)
    private String description;


    @Column(name = "created_at")
    private LocalDateTime createdAt;

//    @Column(name = "update_at")
//    private LocalDateTime updateAt;

    @JsonIgnore
    @OneToMany(mappedBy = "category",cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Product> products;


}
