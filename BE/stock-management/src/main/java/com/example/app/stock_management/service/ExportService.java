package com.example.app.stock_management.service;

import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.dto.request.ExportRequest;
import com.example.app.stock_management.dto.response.ExportResponse;
import com.example.app.stock_management.dto.response.ImportResponse;
import com.example.app.stock_management.entity.Export;

import java.time.LocalDateTime;
import java.util.List;

public interface ExportService {

    ExportResponse createExport (ExportRequest exportRequest);
    List<ExportResponse> getAllExports();
    PageResponse<ExportResponse> getListPageExport(LocalDateTime fromDate, LocalDateTime toDate, int page , int size , String search);
}
