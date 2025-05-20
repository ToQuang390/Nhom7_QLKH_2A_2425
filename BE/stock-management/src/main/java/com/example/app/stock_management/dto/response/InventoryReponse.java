package com.example.app.stock_management.dto.response;

import com.example.app.stock_management.entity.Product;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class InventoryReponse {

    private int id;
    private int quantity;
    private boolean isdelete;
    private BigDecimal avgPrice;
    private Product product;

    
}
