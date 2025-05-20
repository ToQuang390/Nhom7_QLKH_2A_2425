package com.example.app.stock_management.repository;

import com.example.app.stock_management.entity.Customer;
import com.example.app.stock_management.entity.InventoryCheckSlip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryCheckRepository extends JpaRepository<InventoryCheckSlip,Integer>{

    @Query("select u from InventoryCheckSlip u  ")
    Page<InventoryCheckSlip> findByIsdeleteFalse(Pageable pageable);


   @Query("select u from InventoryCheckSlip u  where month(u.createdAt) =:month and year(u.createdAt)=:year")
    List<InventoryCheckSlip> findByMonthAndYear(@Param("month") int month, @Param("year") int year);

}
