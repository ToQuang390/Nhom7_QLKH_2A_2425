package com.example.app.stock_management.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductRequest {

    private int id;
    private String productCode;
    private String name;
    private String description;
    private LocalDateTime createdAt;
    private LocalDateTime updateAt;
    private int categoryId;
    private int unitId;
    private boolean isDelete;


}
