package com.example.app.stock_management.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InventoryCheckDetail {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer systemQuantity;

    private Integer actualQuantity;

    private Integer difference;

    @ManyToOne
    @JoinColumn(name = "inventory_check_slip_id")
    private InventoryCheckSlip inventoryCheckSlip;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

}