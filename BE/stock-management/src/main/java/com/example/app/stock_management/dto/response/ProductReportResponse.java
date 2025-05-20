package com.example.app.stock_management.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductReportResponse {

    private Integer productId;
    private String productCode;
    private String productName;
    private BigDecimal beginQuantity;
    private BigDecimal totalImport;
    private BigDecimal totalExport;
    private BigDecimal totalAdjust;
    private BigDecimal finalQuantity;
}
