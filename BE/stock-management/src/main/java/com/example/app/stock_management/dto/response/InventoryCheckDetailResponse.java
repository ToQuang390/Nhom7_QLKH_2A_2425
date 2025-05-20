package com.example.app.stock_management.dto.response;

import com.example.app.stock_management.entity.Product;
import lombok.Data;

@Data
public class InventoryCheckDetailResponse {

    private  Integer id;
    private Integer systemQuantity;

    private Integer actualQuantity;

    private Integer difference;

    private Product productReponse;

}
