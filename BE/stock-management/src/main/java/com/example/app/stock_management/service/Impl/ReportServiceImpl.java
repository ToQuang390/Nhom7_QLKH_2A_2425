package com.example.app.stock_management.service.Impl;

import com.example.app.stock_management.dto.response.ProductReportResponse;
import com.example.app.stock_management.dto.response.RevenueReportResponse;
import com.example.app.stock_management.repository.InventoryRepository;
import com.example.app.stock_management.service.ReportService;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportServiceImpl implements ReportService {

    @Autowired
    private  InventoryRepository inventoryRepository;
//    @Override
//    public List<ProductReportResponse> getInventoryReport(LocalDateTime fromDate, LocalDateTime toDate) {
//        List<Object[]> rawData = inventoryRepository.getInventoryReport(fromDate, toDate);
//
//        return rawData.stream().map(row -> {
//            ProductReportResponse dto = new ProductReportResponse();
//            dto.setProductId((Integer) row[0]);
//            dto.setBeginQuantity(((BigDecimal) row[2]).intValue());
//            dto.setTotalImport(((BigDecimal) row[3]).intValue());
//            dto.setTotalExport(((BigDecimal) row[4]).intValue());
//            dto.setTotalAdjust(((BigDecimal) row[5]).intValue());
//            dto.setFinalQuantity(((BigDecimal) row[6]).intValue());
//            return dto;
//        }).collect(Collectors.toList());
//    }
    @Override
    public List<ProductReportResponse> getInventoryReport(LocalDateTime fromDate, LocalDateTime toDate) {
        return inventoryRepository.getInventoryReport(fromDate, toDate);
    }

@Override
public byte[] exportInventoryByToPDF(LocalDateTime fromDate, LocalDateTime toDate) {
    List<ProductReportResponse> results = inventoryRepository.getInventoryReport(fromDate, toDate);

    ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
    Document document = new Document(PageSize.A4.rotate()); // Dùng khổ ngang nếu muốn bảng rộng

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");

    try {
        PdfWriter.getInstance(document, outputStream);
        document.open();

        document.add(new Paragraph("Báo cáo tồn kho từ " + formatter.format(fromDate) + " đến " + formatter.format(toDate)));
        document.add(new Paragraph(" "));

        Font headerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD);
        Font dataFont = new Font(Font.FontFamily.HELVETICA, 11);

        PdfPTable table = new PdfPTable(8); // 8 cột
        table.setWidthPercentage(100);
        table.setSpacingBefore(10f);

        // Cố định tỉ lệ chiều rộng các cột (có thể điều chỉnh lại tùy ý)
        float[] columnWidths = {1f, 2f, 4f, 2f, 2f, 2f, 2f, 2f};
        table.setWidths(columnWidths);

        String[] headers = {"STT", "Mã SP", "Tên sản phẩm", "Tồn đầu kỳ", "Tổng nhập", "Tổng xuất", "Kiểm kê", "Tồn cuối kỳ"};
        for (String h : headers) {
            PdfPCell cell = new PdfPCell(new Phrase(h, headerFont));
            cell.setBackgroundColor(BaseColor.LIGHT_GRAY);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setPadding(5);
            table.addCell(cell);
        }
        int index = 1;
        for (ProductReportResponse item : results) {
            table.addCell(createCell(String.valueOf(index++), dataFont));
            table.addCell(createCell(item.getProductCode(), dataFont));
            table.addCell(createCell(item.getProductName(), dataFont));
            table.addCell(createCell(item.getBeginQuantity().toString(), dataFont));
            table.addCell(createCell(item.getTotalImport().toString(), dataFont));
            table.addCell(createCell(item.getTotalExport().toString(), dataFont));
            table.addCell(createCell(item.getTotalAdjust().toString(), dataFont));
            table.addCell(createCell(item.getFinalQuantity().toString(), dataFont));
        }
        document.add(table);
        document.close();

    } catch (Exception e) {
        throw new RuntimeException("Lỗi khi tạo PDF", e);
    }
    return outputStream.toByteArray();
}



    // Hàm tiện ích để tạo cell có tự động xuống dòng
    private PdfPCell createCell(String text, Font font) {
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setNoWrap(false); // Cho phép xuống dòng
        cell.setPadding(4);
        return cell;
    }
}
