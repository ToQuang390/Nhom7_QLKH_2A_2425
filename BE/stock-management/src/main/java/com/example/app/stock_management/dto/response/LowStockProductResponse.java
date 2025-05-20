package com.example.app.stock_management.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LowStockProductResponse {
    private Integer productId;
    private String productName;
    private Integer quantity;
}
