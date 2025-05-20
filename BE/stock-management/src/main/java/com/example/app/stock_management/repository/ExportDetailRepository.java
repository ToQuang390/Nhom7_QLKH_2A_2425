package com.example.app.stock_management.repository;

import com.example.app.stock_management.dto.response.RevenueReportResponse;
import com.example.app.stock_management.entity.ExportDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ExportDetailRepository extends JpaRepository<ExportDetail, Integer> {
    @Query(value = """
        SELECT 
            p.id,
            p.productCode,
            p.name,
            SUM(ed.quantity * ed.price),
            SUM(ed.quantity * (ed.price - ed.avgPrice))
        FROM ExportDetail ed
        JOIN ed.product p
        JOIN ed.exportSlip e
        WHERE YEAR(e.createdAt) = :year
        AND MONTH(e.createdAt) = :month
        GROUP BY p.id, p.productCode, p.name
        ORDER BY SUM(ed.quantity * ed.price) DESC
    """)
    List<Object[]> findProductRevenueByMonth(
            @Param("year") int year,
            @Param("month") int month
    );
}
