package com.example.app.stock_management.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ExportDetailRequest {
    private int quantity;
    private BigDecimal price;
    private int productId;
    private BigDecimal avgPrice;
}
