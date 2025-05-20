package com.example.app.stock_management.service.Impl;

import com.example.app.stock_management.dto.request.UnitRequest;
import com.example.app.stock_management.dto.response.UnitReponse;
import com.example.app.stock_management.entity.UnitType;
import com.example.app.stock_management.repository.UnitRepository;
import com.example.app.stock_management.service.UnitTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UnitTypeServiceImpl implements UnitTypeService {

    @Autowired
    private UnitRepository unitRepository;


    @Override
    public List<UnitReponse> getAllUnits() {
        List<UnitType>typeList = unitRepository.getAllUnit();
        return typeList.stream().map(this::convertUnitTypeToUnitReponse).collect(Collectors.toList());
    }


    @Override
    @Transactional
    public UnitReponse addUnit(UnitRequest unit) {
       UnitType type = convertUnitRequestToUnitType(unit);
        return  convertUnitTypeToUnitReponse(unitRepository.save(type));
    }

    @Override
    @Transactional
    public UnitReponse updateUnit(UnitRequest unit) {
        UnitType type = convertUnitRequestToUnitType(unit);
        return convertUnitTypeToUnitReponse(unitRepository.save(type));
    }

    @Override
    @Transactional
    public boolean deleteUnit(int id) {
        UnitType type = unitRepository.getUnitById(id);
        type.setDelete(true);
        if (type != null) {
            return true;
        }
        return false;
    }

    //UnitType to UnitReponse
    private UnitReponse convertUnitTypeToUnitReponse(UnitType type){
        UnitReponse unitReponse = new UnitReponse();
        unitReponse.setId(type.getId());
        unitReponse.setName(type.getName());
        unitReponse.setDescription(type.getDescription());
        return unitReponse;
    }
    //UnitRequest to UnitType
    private UnitType convertUnitRequestToUnitType(UnitRequest unitRequest){
       UnitType unitType = new UnitType();
       unitType.setId(unitRequest.getId());
       unitType.setName(unitRequest.getName());
       unitType.setDescription(unitRequest.getDescription());
        return unitType;
    }

}
