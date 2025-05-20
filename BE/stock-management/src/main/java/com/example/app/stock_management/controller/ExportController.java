package com.example.app.stock_management.controller;

import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.dto.request.ExportRequest;
import com.example.app.stock_management.dto.request.ImportRequest;
import com.example.app.stock_management.dto.response.ExportResponse;
import com.example.app.stock_management.dto.response.ImportResponse;
import com.example.app.stock_management.entity.Export;
import com.example.app.stock_management.service.ExportService;
import com.example.app.stock_management.service.ImportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping(value = "/api/export")
public class ExportController {

    @Autowired
    private ExportService  exportService;

    @GetMapping
    public ResponseEntity<?> getAllExports() {
        List<ExportResponse> responseList=exportService.getAllExports();
        return ResponseEntity.status(HttpStatus.OK).body(responseList);
    }

    //phân trang
    @GetMapping("/list")
    public ResponseEntity<PageResponse<ExportResponse>> getListPageImport(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search,
            @RequestParam (required = false) String from,
            @RequestParam (required = false) String to)
    {
//        LocalDate fromDate = LocalDate.parse(from);
//        LocalDate toDate = LocalDate.parse(to);
        // Mặc định ngày nếu không truyền vào
        LocalDate fromDate = (from == null || from.isEmpty()) ? LocalDate.of(1970, 1, 1) : LocalDate.parse(from);
        LocalDate toDate = (to == null || to.isEmpty()) ? LocalDate.now() : LocalDate.parse(to);
        PageResponse<ExportResponse> response =
                exportService.getListPageExport(fromDate.atStartOfDay(),toDate.plusDays(1).atStartOfDay(),page, size,search);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> addExport(@RequestBody ExportRequest exportRequest) {
        ExportResponse export = exportService.createExport(exportRequest);
        return ResponseEntity.status(HttpStatus.OK).body(export);
    }

}
