package com.example.app.stock_management.controller;


import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.dto.request.ImportRequest;
import com.example.app.stock_management.dto.response.CustomerReponse;
import com.example.app.stock_management.dto.response.ImportResponse;
import com.example.app.stock_management.dto.response.SupplierResponse;
import com.example.app.stock_management.entity.Import;
import com.example.app.stock_management.service.ImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(value = "/api/import")
public class ImportController {

    @Autowired
    private ImportService importService;

    @GetMapping
    public List<ImportResponse> findAll() {
        List<ImportResponse> importResponses=importService.getAllImports();
        return  importResponses;
    }

    //phân trang
    @GetMapping("/list")
    public ResponseEntity<PageResponse<ImportResponse>> getListPageImport(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search,
            @RequestParam (required = false)String from,
            @RequestParam (required = false)String to)
    {

        LocalDate fromDate = (from == null || from.isEmpty()) ? LocalDate.of(1970, 1, 1) : LocalDate.parse(from);
        LocalDate toDate = (to == null || to.isEmpty()) ? LocalDate.now() : LocalDate.parse(to);
        PageResponse<ImportResponse> response =
                importService.getListPageImport(fromDate.atStartOfDay(),toDate.plusDays(1).atStartOfDay(),page, size,search);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> addImport(@RequestBody ImportRequest importRequest) {
        ImportResponse createdImport = importService.createImport(importRequest);
        return ResponseEntity.status(HttpStatus.OK).body(createdImport);
    }

    @DeleteMapping(value = "/{id}")
    public boolean deleteImport(@PathVariable int id) {
        boolean isCheck=importService.deleteImport(id);
        return isCheck;
    }

}
