package com.example.app.stock_management.dto.response;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ImportDetailResponse {
    private int id;
    private int quantity;
    private BigDecimal price;
    private ProductReponse productReponse;
//    private LocalDateTime createdAt;
//    private LocalDateTime updateAt;

}