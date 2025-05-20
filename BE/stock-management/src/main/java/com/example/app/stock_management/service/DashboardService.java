package com.example.app.stock_management.service;

import com.example.app.stock_management.dto.response.DashboardResponse;
import com.example.app.stock_management.dto.response.LowStockProductResponse;

import java.util.List;

public interface DashboardService {
    DashboardResponse getDashboardCounts();
    List<LowStockProductResponse> getLowStockProducts();
}
