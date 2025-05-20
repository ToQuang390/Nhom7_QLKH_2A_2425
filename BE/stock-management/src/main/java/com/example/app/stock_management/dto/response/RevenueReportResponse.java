package com.example.app.stock_management.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RevenueReportResponse {
    private int productId;
    private String productCode;
    private String productName;
    private BigDecimal totalRevenue;
    private BigDecimal totalProfit;


}
