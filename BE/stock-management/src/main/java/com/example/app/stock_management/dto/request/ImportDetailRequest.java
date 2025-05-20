package com.example.app.stock_management.dto.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ImportDetailRequest {
    private int quantity;
    private BigDecimal price;
    private int productId;
//    private LocalDateTime createdAt;
//    private int unitId;
//    private LocalDateTime updateAt;
}