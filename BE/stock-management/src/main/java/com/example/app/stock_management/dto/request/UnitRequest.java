package com.example.app.stock_management.dto.request;

import lombok.Data;

@Data
public class UnitRequest {
    private int id;
    private String name;
    private String description;
    private boolean isDelete;
}
