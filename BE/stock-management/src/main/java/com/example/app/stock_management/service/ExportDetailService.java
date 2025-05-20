package com.example.app.stock_management.service;

import com.example.app.stock_management.dto.request.RevenueReportRequest;
import com.example.app.stock_management.dto.response.RevenueReportResponse;

import java.util.List;

public interface ExportDetailService {
    List<RevenueReportResponse> getRevenueByMonth(RevenueReportRequest request);
    byte[] exportRevenueByMonthToPDF(RevenueReportRequest request);


}
