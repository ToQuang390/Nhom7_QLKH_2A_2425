package com.example.app.stock_management.service;

import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.dto.response.CustomerReponse;
import com.example.app.stock_management.dto.response.InventoryListResponse;
import com.example.app.stock_management.dto.response.InventoryReponse;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface InventoryService {
    List<InventoryReponse> getLatestInventoryResponseList();
    List<InventoryReponse> GetListInventory();

    List<InventoryListResponse> getListProductInInventory();
    PageResponse<InventoryReponse> getListProductInInventoryPage(int page, int size, String search );
}
