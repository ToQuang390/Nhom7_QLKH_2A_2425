package com.example.app.stock_management.service.Impl;

import com.example.app.stock_management.dto.response.DashboardResponse;
import com.example.app.stock_management.dto.response.LowStockProductResponse;
import com.example.app.stock_management.repository.DashboardRepository;
import com.example.app.stock_management.repository.InventoryRepository;
import com.example.app.stock_management.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private DashboardRepository dashboardRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Override
    public DashboardResponse getDashboardCounts() {
        return dashboardRepository.getDashboardCounts();
    }

    @Override
    public List<LowStockProductResponse> getLowStockProducts() {
        return inventoryRepository.findLowStockProducts();
    }
}
