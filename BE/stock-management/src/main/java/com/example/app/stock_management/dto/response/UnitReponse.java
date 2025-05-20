package com.example.app.stock_management.dto.response;

import lombok.Data;

@Data
public class UnitReponse {
    private int id;
    private String name;
    private String description;
    private boolean isDelete;
}
