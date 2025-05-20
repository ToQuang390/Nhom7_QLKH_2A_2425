package com.example.app.stock_management.entity;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "importdetail")
public class ImportDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "price", precision = 15, scale = 2)
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "import_id")
    private Import importSlip;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;



//    @ManyToOne
//    @JoinColumn(name = "unit_id")
//    private UnitType unit;

//    @Column(name = "created_at")
//    private LocalDateTime createdAt;
//
//    @Column(name = "update_at")
//    private LocalDateTime updateAt;




}
