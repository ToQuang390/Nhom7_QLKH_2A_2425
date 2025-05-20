package com.example.app.stock_management.service;

import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.dto.request.SupplierRequest;
import com.example.app.stock_management.dto.response.CustomerReponse;
import com.example.app.stock_management.dto.response.SupplierResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SupplierService {
    List<SupplierResponse> getSupplierAll();
    SupplierResponse addSuppliers(SupplierRequest supplierRequest);
    SupplierResponse getSupplierById(int id);
    SupplierResponse updateSupplier(SupplierRequest supplierRequest);
    boolean deleteSupplier(int id);

    PageResponse<SupplierResponse> getAllSuppliersPage(int page, int size, String search );

}
