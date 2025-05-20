package com.example.app.stock_management.repository;

import com.example.app.stock_management.entity.Customer;
import com.example.app.stock_management.entity.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface ImportRepository extends JpaRepository<Import, Integer> {

    @Query("select i from Import i where i.isDelete=false ")
    Page<Import> getListPage(Pageable pageable);

    @Query("SELECT i FROM Import i " +
            "WHERE (CAST(i.id AS string) LIKE %:key% " +
            "OR LOWER(i.supplier.supplier_name) LIKE LOWER(CONCAT('%', :key, '%')) " +
            "OR LOWER(i.user.username) LIKE LOWER(CONCAT('%',:key,'%'))) " +
            "AND i.isDelete = false")
    Page<Import> findByKey(@Param("key") String key, Pageable pageable);

    @Query("SELECT i FROM Import i " +
            "WHERE i.createdAt BETWEEN :startOfDay AND :endOfDay " +
            "AND i.isDelete = false")
    Page<Import> findByCreatedAtBetween(@Param("startOfDay") LocalDateTime startOfDay,
                                        @Param("endOfDay") LocalDateTime endOfDay,
                                        Pageable pageable);

//    @Query("SELECT i FROM Import i " +
//            "WHERE (CAST(i.id AS string) LIKE %:key% " +
//            "OR LOWER(i.supplier.supplier_name) LIKE LOWER(CONCAT('%', :key, '%')) " +
//            "OR LOWER(i.user.username) LIKE LOWER(CONCAT('%', :key, '%'))) " +
//            "AND i.createdAt BETWEEN :startDate AND :endDate " +
//            "AND i.isDelete = false")
//    Page<Import> searchByKeywordAndDate(@Param("key") String key,
//                                        @Param("startDate") LocalDateTime startDate,
//                                        @Param("endDate") LocalDateTime endDate,
//                                        Pageable pageable);
@Query("SELECT i FROM Import i " +
        "WHERE CAST(i.id AS string) LIKE %:key% " +
        "AND i.createdAt BETWEEN :startDate AND :endDate " +
        "AND i.isDelete = false")
Page<Import> searchByKeywordAndDate(@Param("key") String key,
                                    @Param("startDate") LocalDateTime startDate,
                                    @Param("endDate") LocalDateTime endDate,
                                    Pageable pageable);
}
