package com.example.app.stock_management.entity;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "product_code")
    private String productCode;

    @Column(name = "name",length = 255)
    private String name;

//    @Column(name = "image_url", columnDefinition = "TEXT")
//    private String imageUrl;

    @Column(name = "description",length = 255)
    private String description;

    @Column(name = "isdelete")
    private boolean isDelete;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE,CascadeType.DETACH})
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "unit_id")
    private UnitType unit;

//    @OneToOne(mappedBy = "product")
//    private Inventory inventory;



}

