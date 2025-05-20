package com.example.app.stock_management.controller;


import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.dto.request.InventoryCheckRequest;
import com.example.app.stock_management.dto.response.CustomerReponse;
import com.example.app.stock_management.dto.response.InventoryCheckResponse;
import com.example.app.stock_management.service.InventoryCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api/inventorycheck")
public class InventoryCheckController {

@Autowired
private InventoryCheckService inventoryCheckService;

    @GetMapping
    public List<InventoryCheckResponse> getInventoryCheck() {
        List<InventoryCheckResponse> inventoryCheckResponses = inventoryCheckService.getAllList();
        return inventoryCheckResponses;
    }

    @GetMapping("/search")
    public ResponseEntity<List<InventoryCheckResponse>> searchByMonthYear(
            @RequestParam("year") int year,
            @RequestParam("month") int month
    ) {
        List<InventoryCheckResponse> results = inventoryCheckService.searchByMonthYear(month, year);
        return ResponseEntity.ok(results);
    }


    @PostMapping
    public boolean addCheck(@RequestBody InventoryCheckRequest request) {
        boolean isCheck=inventoryCheckService.addInventoryCheck(request);
        return isCheck;
    }



}
