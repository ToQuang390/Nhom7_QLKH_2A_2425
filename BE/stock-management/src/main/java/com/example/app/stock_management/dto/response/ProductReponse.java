package com.example.app.stock_management.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProductReponse {
    private int id;
    private String productCode;
    private String name;
    private String description;

    @JsonFormat(pattern = "yyyy-MM-dd ")
    private LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd ")
    private LocalDateTime updateAt;
    private CategoryReponse CategoryReponse;
    private  UnitReponse UnitReponse;
    private boolean isDelete;
}
