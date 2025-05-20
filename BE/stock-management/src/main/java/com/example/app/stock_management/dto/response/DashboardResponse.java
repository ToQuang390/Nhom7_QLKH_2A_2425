package com.example.app.stock_management.dto.response;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardResponse {
   private Long getTotalProducts;
   private Long getTotalCategories;
   private Long getTotalSuppliers;
   private Long getLowStockProducts;
}
