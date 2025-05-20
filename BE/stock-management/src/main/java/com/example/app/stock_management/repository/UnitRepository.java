package com.example.app.stock_management.repository;

import com.example.app.stock_management.dto.response.UnitReponse;
import com.example.app.stock_management.entity.UnitType;
import com.example.app.stock_management.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UnitRepository extends JpaRepository<UnitType,Integer> {
    @Query("SELECT u FROM UnitType u WHERE u.isDelete = false")
    List<UnitType> getAllUnit();
    UnitType getUnitById(int id);
    UnitType findById(int id);
}
