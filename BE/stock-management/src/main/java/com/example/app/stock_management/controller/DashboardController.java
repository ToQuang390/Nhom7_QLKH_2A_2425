package com.example.app.stock_management.controller;

import com.example.app.stock_management.dto.response.DashboardResponse;
import com.example.app.stock_management.dto.response.LowStockProductResponse;
import com.example.app.stock_management.service.DashboardService;
import com.example.app.stock_management.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/counts")
    public ResponseEntity<DashboardResponse> getCounts() {
        return ResponseEntity.ok(dashboardService.getDashboardCounts());
    }
    @GetMapping("/low-stock")
    public ResponseEntity<List<LowStockProductResponse>> getLowStockProducts() {
        return ResponseEntity.ok(dashboardService.getLowStockProducts());
    }
}
