package com.example.app.stock_management.service;

import com.example.app.stock_management.dto.request.RevenueReportRequest;
import com.example.app.stock_management.dto.response.ProductReportResponse;
import com.example.app.stock_management.dto.response.RevenueReportResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface ReportService {
    List<ProductReportResponse> getInventoryReport(LocalDateTime fromDate, LocalDateTime toDate);
    byte[] exportInventoryByToPDF(LocalDateTime fromDate, LocalDateTime toDate);

}
