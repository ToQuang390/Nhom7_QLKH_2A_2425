package com.example.app.stock_management.controller;

import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.dto.request.SupplierRequest;
import com.example.app.stock_management.dto.response.CustomerReponse;
import com.example.app.stock_management.dto.response.SupplierResponse;
import com.example.app.stock_management.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/supplier")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    //Lấy danh sach nha cung cap
    @GetMapping
    public List<SupplierResponse> getAllSuppliers() {
        List<SupplierResponse> supplierResponseList=  supplierService.getSupplierAll();
        return supplierResponseList;
    }
    //phân trang
    @GetMapping(value = "/list")
    public ResponseEntity<PageResponse<SupplierResponse>> getAllCustomers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search
    ) {
        PageResponse<SupplierResponse> response = supplierService.getAllSuppliersPage(page, size,search);
        return ResponseEntity.ok(response);
    }

    //lay nha cung cap theo id
    @GetMapping(value = "/{id}")
    public SupplierResponse getSupplierById(@PathVariable int id) {
        return  supplierService.getSupplierById(id);
    }

    //them nha cung cap
    @PostMapping
    public SupplierResponse addSupplier(@RequestBody SupplierRequest supplierRequest) {
        SupplierResponse supplierResponse = supplierService.addSuppliers(supplierRequest);
        return supplierResponse;
    }

    //sua thong tin nha cung cap
    @PutMapping
    public SupplierResponse updateSupplier(@RequestBody SupplierRequest supplierRequest) {
        SupplierResponse supplierResponse=supplierService.updateSupplier(supplierRequest);
        return  supplierResponse;
    }


    //xoa nha cung cap
    @DeleteMapping(value = "/{id}")
    public boolean deleteSupplier(@PathVariable int id) {
        boolean isChecked = supplierService.deleteSupplier(id);
        if(isChecked){
            return true;
        }
        return false;
    }



}
