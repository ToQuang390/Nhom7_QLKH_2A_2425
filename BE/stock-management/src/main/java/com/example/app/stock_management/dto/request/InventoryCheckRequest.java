package com.example.app.stock_management.dto.request;

import com.example.app.stock_management.entity.Product;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class InventoryCheckRequest {


    private LocalDateTime createdAt;

    private String note;

    private int userId;

    private List<InventoryCheckDetailRequest> checkDetailList;
}
