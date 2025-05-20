package com.example.app.stock_management.controller;


import com.example.app.stock_management.dto.request.RevenueReportRequest;
import com.example.app.stock_management.dto.response.ProductReportResponse;
import com.example.app.stock_management.dto.response.RevenueReportResponse;
import com.example.app.stock_management.service.ExportDetailService;
import com.example.app.stock_management.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class BusinessReportController {

    @Autowired
    private  ExportDetailService exportDetailService;


    @Autowired
    private ReportService reportService;

    //báo cáo doanh thu và lợi nhuận theo tháng
    @GetMapping("/by-month")
    public List<RevenueReportResponse> getRevenueByMonth(
            @RequestParam("year") int year,
            @RequestParam("month") int month) {
        RevenueReportRequest request = new RevenueReportRequest();
        request.setYear(year);
        request.setMonth(month);
        List<RevenueReportResponse> responseList=exportDetailService.getRevenueByMonth(request);
        return responseList;
    }

    @GetMapping("/by-monthToPDF")
    public ResponseEntity<byte[]> exportRevenuePdf(@RequestParam int month, @RequestParam int year) {
        RevenueReportRequest request = new RevenueReportRequest();
        request.setMonth(month);
        request.setYear(year);

        byte[] pdfBytes = exportDetailService.exportRevenueByMonthToPDF(request);

        HttpHeaders headers = new HttpHeaders();
        String fileName = "bao-cao.pdf";
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.add("Content-Disposition", "attachment; filename*=UTF-8''" + URLEncoder.encode(fileName, StandardCharsets.UTF_8));
        headers.setContentLength(pdfBytes.length);
        return ResponseEntity
                .ok()
                .headers(headers)
                .body(pdfBytes);
    }

    //báo cáo xuất nhập tồn
    @GetMapping("/inventory")
    public ResponseEntity<List<ProductReportResponse>> getInventory(
            @RequestParam String from,
            @RequestParam String to) {
        LocalDate fromDate = LocalDate.parse(from);
        LocalDate toDate = LocalDate.parse(to);
        // Gọi service xử lý, cộng thêm 1 ngày để tính hết ngày cuối cùng
        List<ProductReportResponse> report = reportService.getInventoryReport(
                fromDate.atStartOfDay(),
                toDate.plusDays(1).atStartOfDay()
        );
        return ResponseEntity.ok(report);
    }

    @GetMapping("/inventoryToPDF")
    public ResponseEntity<byte[]> exportgetInventoryToPDF(
            @RequestParam String from,
            @RequestParam String to) {
        LocalDate fromDate = LocalDate.parse(from);
        LocalDate toDate = LocalDate.parse(to);

        byte[] pdfBytes = reportService.exportInventoryByToPDF(fromDate.atStartOfDay(),
                toDate.plusDays(1).atStartOfDay());

        HttpHeaders headers = new HttpHeaders();
        String fileName = "bao-cao.pdf";
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.add("Content-Disposition", "attachment; filename*=UTF-8''" + URLEncoder.encode(fileName, StandardCharsets.UTF_8));
        headers.setContentLength(pdfBytes.length);
        return ResponseEntity
                .ok()
                .headers(headers)
                .body(pdfBytes);
    }


}
