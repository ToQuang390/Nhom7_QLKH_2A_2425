package com.example.app.stock_management.controller;


import com.example.app.stock_management.dto.request.UnitRequest;
import com.example.app.stock_management.dto.response.UnitReponse;
import com.example.app.stock_management.service.UnitTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/unit")
public class UnitTypeController {

    @Autowired
    private UnitTypeService unitTypeService;

    @GetMapping
    public List<UnitReponse> getUnitTypes() {
        List<UnitReponse> unitReponseList=unitTypeService.getAllUnits();
        return unitReponseList;
    }

    @PostMapping
    public UnitReponse addUnitType(@RequestBody UnitRequest unitRequest) {
        return unitTypeService.addUnit(unitRequest);
    }


    @PutMapping
    public UnitReponse updateUnitType(@RequestBody UnitRequest unitRequest) {
            UnitReponse unitReponse=unitTypeService.updateUnit(unitRequest);
            if(unitReponse==null)
                return null;
            return  unitReponse;
    }

    @DeleteMapping(value = "/{id}")
    public Boolean deleteUnitType(@PathVariable int id) {
        boolean isCheck=unitTypeService.deleteUnit(id);
        if(isCheck)
            return true;
        return false;
    }


}
