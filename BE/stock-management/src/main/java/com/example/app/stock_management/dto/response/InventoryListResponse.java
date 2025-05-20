package com.example.app.stock_management.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InventoryListResponse {
    private int id;                // inventory id
    private BigDecimal avgPrice;
    private int quantity;

    private int productId;
    private String productName;
    private String productCode;

    private String categoryName;
    private int categoryId;

    private int unitId;
    private String unitName;
}
