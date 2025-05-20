package com.example.app.stock_management.dto.request;

import lombok.Data;

@Data
public class InventoryCheckDetailRequest {

    private Integer systemQuantity;

    private Integer actualQuantity;

    private Integer difference;

    private Integer productId;

}
