package com.example.app.stock_management.repository;


import com.example.app.stock_management.dto.response.RevenueReportResponse;
import com.example.app.stock_management.entity.Export;
import com.example.app.stock_management.entity.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExportRepository extends JpaRepository<Export, Integer> {

    @Query("select e from Export e where e.isDelete=false ")
    Page<Export> getListPage(Pageable pageable);

    @Query("SELECT e FROM Export e " +
            "WHERE (CAST(e.id AS string) LIKE %:key% " +
            "OR LOWER(e.customer.name) LIKE LOWER(CONCAT('%', :key, '%')) " +
            "OR LOWER(e.user.username) LIKE LOWER(CONCAT('%', :key, '%'))) " +
            "AND e.isDelete = false")
    Page<Export> findByKey(@Param("key") String key, Pageable pageable);

    @Query("SELECT e FROM Export e " +
            "WHERE e.createdAt BETWEEN :startOfDay AND :endOfDay " +
            "AND e.isDelete = false")
    Page<Export> findByCreatedAtBetween(@Param("startOfDay") LocalDateTime startOfDay,
                                        @Param("endOfDay") LocalDateTime endOfDay,
                                        Pageable pageable);

    @Query("SELECT e FROM Export e " +
            "WHERE (CAST(e.id AS string) LIKE %:key% " +
            "OR LOWER(e.customer.name) LIKE LOWER(CONCAT('%', :key, '%')) " +
            "OR LOWER(e.user.username) LIKE LOWER(CONCAT('%', :key, '%'))) " +
            "AND e.createdAt BETWEEN :startDate AND :endDate " +
            "AND e.isDelete = false")
    Page<Export> searchByKeywordAndDate(@Param("key") String key,
                                        @Param("startDate") LocalDateTime startDate,
                                        @Param("endDate") LocalDateTime endDate,
                                        Pageable pageable);
}
