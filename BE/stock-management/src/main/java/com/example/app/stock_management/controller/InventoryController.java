package com.example.app.stock_management.controller;


import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.dto.response.CustomerReponse;
import com.example.app.stock_management.dto.response.InventoryListResponse;
import com.example.app.stock_management.dto.response.InventoryReponse;
import com.example.app.stock_management.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/inventory")
public class InventoryController {

    @Autowired
    InventoryService inventoryService;
        //Tất cả sản phẩm trong kho
    @GetMapping(value = "/list")
    public List<InventoryReponse> getInventory() {
        List<InventoryReponse> inventoryList = inventoryService.GetListInventory();
        return inventoryList;
    }

    //phân trang
    @GetMapping(value = "/listpage")
    public ResponseEntity<PageResponse<InventoryReponse>> getAllCustomers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search
    ) {
        PageResponse<InventoryReponse> response = inventoryService.getListProductInInventoryPage(page, size,search);
        return ResponseEntity.ok(response);
    }


    //Danh sách  sản phẩm mới nhất
    @GetMapping
    public List<InventoryReponse> getInventorys() {
        List<InventoryReponse> inventoryList = inventoryService.getLatestInventoryResponseList();
        return inventoryList;
    }



    //Danh sach san pham cho phuc vụ cho api xuất hàng
    @GetMapping(value = "/listproduct")
    public List<InventoryListResponse> GetListProductInInventorys() {
        List<InventoryListResponse> inventoryList = inventoryService.getListProductInInventory();
        return inventoryList;
    }


}
