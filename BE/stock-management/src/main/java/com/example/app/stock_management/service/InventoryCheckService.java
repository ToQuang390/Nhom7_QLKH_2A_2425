package com.example.app.stock_management.service;

import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.dto.request.InventoryCheckRequest;
import com.example.app.stock_management.dto.response.CustomerReponse;
import com.example.app.stock_management.dto.response.InventoryCheckResponse;

import java.util.List;

public interface InventoryCheckService {
    List<InventoryCheckResponse> getAllList();
    boolean addInventoryCheck(InventoryCheckRequest inventoryCheckRequest);
    List<InventoryCheckResponse> searchByMonthYear(int month, int year);

}
