package com.example.app.stock_management.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "export")
public class Export {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "total", precision = 15, scale = 2)
    private BigDecimal total;

    @Column(name = "description",length = 255)
    private String description;

    @Column(name = "isdelete")
    private boolean isDelete;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @OneToMany(mappedBy = "exportSlip", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ExportDetail> exportDetailList;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;


}
