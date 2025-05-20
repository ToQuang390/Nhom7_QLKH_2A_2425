package com.example.app.stock_management.repository;

import com.example.app.stock_management.dto.response.InventoryListResponse;
import com.example.app.stock_management.dto.response.InventoryReponse;
import com.example.app.stock_management.dto.response.LowStockProductResponse;
import com.example.app.stock_management.dto.response.ProductReportResponse;
import com.example.app.stock_management.entity.Customer;
import com.example.app.stock_management.entity.Inventory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
    Optional<Inventory> findByProductId(int productId);

    @Query("SELECT v FROM Inventory v WHERE v.product.id = :productId ORDER BY v.createdAt DESC limit 1")
    Inventory findTopByProductIdOrderByCreatedAtDesc(@Param("productId") int productId);

    @Query(value = "SELECT * FROM inventory WHERE product_id = :productId ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Optional<Inventory> findLatestInventoryByProductId(@Param("productId") int productId);



    @Query(value = """
    SELECT i.*
    FROM inventory i
    JOIN (
        SELECT product_id, MAX(created_at) as max_created_at
        FROM inventory
        WHERE isdelete = false
        GROUP BY product_id
    ) latest ON i.product_id = latest.product_id AND i.created_at = latest.max_created_at
    """, nativeQuery = true)
    List<Inventory> findLatestInventoryEachProduct();

    //không có từ khóa
    @Query(value = """
    SELECT i.*
    FROM inventory i
    JOIN (
        SELECT product_id, MAX(created_at) as max_created_at
        FROM inventory
        WHERE isdelete = false
        GROUP BY product_id
    ) latest ON i.product_id = latest.product_id AND i.created_at = latest.max_created_at
    """, nativeQuery = true)
    Page<Inventory> findByIsdeleteFalse(Pageable pageable);

    //tìm kiếm theo từ khóa
    @Query(value = """
    SELECT i.*
    FROM inventory i
    JOIN (
        SELECT product_id, MAX(created_at) as max_created_at
        FROM inventory
        WHERE isdelete = false
        GROUP BY product_id
    ) latest ON i.product_id = latest.product_id AND i.created_at = latest.max_created_at
    JOIN product p ON i.product_id = p.id
    WHERE (p.name LIKE %:key% OR p.product_code LIKE %:key%)
    """,
            countQuery = """
    SELECT COUNT(*)
    FROM inventory i
    JOIN (
        SELECT product_id, MAX(created_at) as max_created_at
        FROM inventory
        WHERE isdelete = false
        GROUP BY product_id
    ) latest ON i.product_id = latest.product_id AND i.created_at = latest.max_created_at
    JOIN product p ON i.product_id = p.id
    WHERE (p.name LIKE %:key% OR p.product_code LIKE %:key%)
    """,
            nativeQuery = true)
    Page<Inventory> findLatestInventoryByProductNameOrCode(@Param("key") String key, Pageable pageable);



    @Query(value = """
SELECT i.id,i.avgprice,i.quantity,\s
 p.id as productId, p.name as productName,p.product_code as productCode,
 c.name as categoryName,c.id categoryId,
 u.id as unitId,u.name as unitName
    FROM inventory i
    JOIN product p ON i.product_id = p.id
    JOIN unit u ON u.id = p.unit_id
    JOIN category c ON c.id = p.category_id
    JOIN (
        SELECT product_id, MAX(created_at) AS max_created_at
        FROM inventory
        WHERE isdelete = false
        GROUP BY product_id
    ) latest ON i.product_id = latest.product_id AND i.created_at = latest.max_created_at
    """, nativeQuery = true)
    List<InventoryListResponse> getListProductInInventory();

    @Query(value = """
  SELECT
      p.id AS product_id,
       p.product_code as product_code,
      p.name AS product_name,
      COALESCE(b.begin_quantity, 0) AS begin_quantity,
      COALESCE(im.total_import, 0) AS total_import,
      COALESCE(ex.total_export, 0) AS total_export,
      COALESCE(adj.total_adjust, 0) AS total_adjust,
  
      -- Tồn cuối kỳ = Tồn đầu + Nhập - Xuất + Điều chỉnh
      (COALESCE(b.begin_quantity, 0) + COALESCE(im.total_import, 0)
       - COALESCE(ex.total_export, 0) + COALESCE(adj.total_adjust, 0)) AS end_quantity
  FROM product p
  -- Tồn đầu kỳ
  LEFT JOIN (
      SELECT
          product_id,
          SUM(quantity) AS begin_quantity
      FROM inventory
      WHERE created_at < :fromDate AND isdelete = false
      GROUP BY product_id
  ) b ON b.product_id = p.id
  -- Tổng nhập trong tháng
  LEFT JOIN (
      SELECT
          id.product_id,
          SUM(id.quantity) AS total_import
      FROM importdetail id
      JOIN import i ON id.import_id = i.id
      WHERE i.created_at >= :fromDate AND i.created_at < :toDate
            AND i.isdelete = false
      GROUP BY id.product_id
  ) im ON im.product_id = p.id
  -- Tổng xuất trong tháng
  LEFT JOIN (
      SELECT
          ed.product_id,
          SUM(ed.quantity) AS total_export
      FROM exportdetail ed
      JOIN export e ON ed.export_id = e.id
      WHERE e.created_at >= :fromDate AND e.created_at < :toDate
            AND e.isdelete = false
      GROUP BY ed.product_id
  ) ex ON ex.product_id = p.id
  -- Điều chỉnh trong tháng
  LEFT JOIN (
      SELECT\s
          d.product_id,
          SUM(d.difference) AS total_adjust
      FROM inventory_check_detail d
      JOIN inventory_check_slip s ON d.inventory_check_slip_id = s.id
      WHERE s.created_at >= :fromDate AND s.created_at < :toDate
      GROUP BY d.product_id
  ) adj ON adj.product_id = p.id
  ORDER BY p.id;
""", nativeQuery = true)
    List<ProductReportResponse> getInventoryReport(
            @Param("fromDate") LocalDateTime fromDate,
            @Param("toDate") LocalDateTime toDate
    );

    @Query(value = """
    SELECT p.id AS productId, p.name AS productName, i.quantity AS quantity
    FROM (
        SELECT *,
               ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY created_at DESC) AS rn
        FROM inventory
    ) i
    JOIN product p ON p.id = i.product_id
    WHERE i.rn = 1 AND i.quantity < 10
    LIMIT 20
""", nativeQuery = true)
    List<LowStockProductResponse> findLowStockProducts();
}
