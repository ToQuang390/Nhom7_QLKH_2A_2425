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
public class InventoryCheckSlip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private LocalDateTime createdAt;

    private String note;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users createdBy;

    @OneToMany(mappedBy = "inventoryCheckSlip", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<InventoryCheckDetail> detailsListCheck;
}
