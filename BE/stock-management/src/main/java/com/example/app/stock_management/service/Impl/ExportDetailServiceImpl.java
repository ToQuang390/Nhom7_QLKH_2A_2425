package com.example.app.stock_management.service.Impl;

import com.example.app.stock_management.dto.request.RevenueReportRequest;
import com.example.app.stock_management.dto.response.RevenueReportResponse;
import com.example.app.stock_management.repository.ExportDetailRepository;
import com.example.app.stock_management.service.ExportDetailService;
import com.itextpdf.text.*;
import com.itextpdf.text.Font;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import lombok.RequiredArgsConstructor;
import org.eclipse.angus.mail.iap.ByteArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.http.HttpHeaders;
@Service
@RequiredArgsConstructor
public class ExportDetailServiceImpl implements ExportDetailService{

    @Autowired
    private  ExportDetailRepository exportDetailRepository;

    @Override
    public List<RevenueReportResponse> getRevenueByMonth(RevenueReportRequest request) {
        List<Object[]> results = exportDetailRepository.findProductRevenueByMonth(request.getYear(), request.getMonth());
        return results.stream()
                .map(this::convertToRevenueReportResponse)
                .toList();
    }

    //xuất pdt báo cáo doanh thu tháng
    @Override
    public byte[] exportRevenueByMonthToPDF(RevenueReportRequest request) {
        List<Object[]> results = exportDetailRepository.findProductRevenueByMonth(request.getYear(), request.getMonth());
        List<RevenueReportResponse> reportResponseList = results.stream()
                .map(this::convertToRevenueReportResponse)
                .toList();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4);

        try {
            PdfWriter.getInstance(document, outputStream);
            document.open();

            document.add(new Paragraph("Báo cáo doanh thu " + request.getMonth() + "/" + request.getYear()));
            document.add(new Paragraph(" "));

            Font headerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            table.setSpacingBefore(10f);

            String[] headers = {"STT", "Ma ", "Tên ", "Doanh thu", "Loi nhuan"};
            for (String h : headers) {
                PdfPCell cell = new PdfPCell(new Phrase(h, headerFont));
                cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(cell);
            }

            int index = 1;
            Font dataFont = new Font(Font.FontFamily.HELVETICA, 11);
            for (RevenueReportResponse item : reportResponseList) {
                table.addCell(new Phrase(String.valueOf(index++), dataFont));
                table.addCell(new Phrase(item.getProductCode(), dataFont));
                table.addCell(new Phrase(item.getProductName(), dataFont));
                table.addCell(new Phrase(String.format("%,.0f", item.getTotalRevenue()), dataFont));
                table.addCell(new Phrase(String.format("%,.0f", item.getTotalProfit()), dataFont));
            }

            document.add(table);
            document.close();

        } catch (DocumentException e) {
            throw new RuntimeException("Lỗi khi tạo PDF", e);
        }
        return outputStream.toByteArray();
    }


    private RevenueReportResponse convertToRevenueReportResponse(Object[] row) {
        RevenueReportResponse response = new RevenueReportResponse();
        response.setProductId((Integer) row[0]);
        response.setProductCode((String) row[1]);
        response.setProductName((String) row[2]);
        response.setTotalRevenue((BigDecimal) row[3]);
        response.setTotalProfit((BigDecimal) row[4]);
        return response;
    }
}
