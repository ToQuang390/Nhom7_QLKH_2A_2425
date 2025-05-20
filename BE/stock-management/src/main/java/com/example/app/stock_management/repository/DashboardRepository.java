package com.example.app.stock_management.repository;

import com.example.app.stock_management.dto.response.DashboardResponse;
import com.example.app.stock_management.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DashboardRepository extends JpaRepository<Product, Integer> {

    @Query(value = """
            SELECT
            (SELECT COUNT(*) FROM product where isdelete=false) AS total_products,
            (SELECT COUNT(*) FROM category where isdelete=false) AS total_categories,
                (SELECT COUNT(*) FROM suppliers where isdelete=false) AS total_suppliers,
             (
                    SELECT COUNT(*)
                    FROM (
                        SELECT *,
                               ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY created_at DESC) AS rn
                        FROM inventory
                    ) latest_inventory
                    WHERE rn = 1 AND quantity < 10
                ) AS low_stock_products;
        """, nativeQuery = true)
    DashboardResponse getDashboardCounts();
}
