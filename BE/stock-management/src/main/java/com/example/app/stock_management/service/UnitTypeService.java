package com.example.app.stock_management.service;

import com.example.app.stock_management.dto.request.UnitRequest;
import com.example.app.stock_management.dto.response.UnitReponse;
import com.example.app.stock_management.entity.UnitType;

import java.util.List;

public interface UnitTypeService {
    List<UnitReponse> getAllUnits();
    UnitReponse addUnit(UnitRequest unit);
    UnitReponse updateUnit(UnitRequest unit);
    boolean deleteUnit(int id);
}
