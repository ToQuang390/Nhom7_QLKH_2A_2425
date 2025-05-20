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
@Table(name = "exportdetail")
public class ExportDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "quantity")
    private int quantity;


    @Column(name = "price", precision = 15, scale = 2)
    private BigDecimal price;

    @Column(name = "avgprice", precision = 15, scale = 2)
    private BigDecimal avgPrice;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @ManyToOne
    @JoinColumn(name = "export_id")
    private Export exportSlip;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

}
