package com.example.app.stock_management.service.Impl;


import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.dto.request.InventoryCheckDetailRequest;
import com.example.app.stock_management.dto.request.InventoryCheckRequest;
import com.example.app.stock_management.dto.response.*;
import com.example.app.stock_management.entity.*;
import com.example.app.stock_management.repository.InventoryCheckRepository;
import com.example.app.stock_management.repository.InventoryRepository;
import com.example.app.stock_management.repository.ProductRepository;
import com.example.app.stock_management.repository.UserRepository;
import com.example.app.stock_management.service.InventoryCheckService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryCheckServiceImpl implements InventoryCheckService {


    @Autowired
    private InventoryCheckRepository inventoryCheckRepository;

    @Autowired
    private UserRepository UserRepository;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Override
    public List<InventoryCheckResponse> getAllList() {
        List<InventoryCheckSlip> inventoryCheckSlips = inventoryCheckRepository.findAll();
        return inventoryCheckSlips.stream().map(this::convertFromInventoryToInventoryCheckResponse).collect(Collectors.toList());
    }

    @Override
    public List<InventoryCheckResponse> searchByMonthYear(int month ,int year) {
        if((month>0 && month<=12) && year>0 ) {
            List<InventoryCheckSlip> inventoryCheckSlips = inventoryCheckRepository.findByMonthAndYear(month, year);
            return inventoryCheckSlips.stream().map(this::convertFromInventoryToInventoryCheckResponse).collect(Collectors.toList());
        }
        List<InventoryCheckSlip> inventoryCheckSlips = inventoryCheckRepository.findAll();
        return inventoryCheckSlips.stream().map(this::convertFromInventoryToInventoryCheckResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public boolean addInventoryCheck(InventoryCheckRequest inventoryCheckRequest) {

        InventoryCheckSlip inventoryCheckSlip = new InventoryCheckSlip();
        inventoryCheckSlip.setCreatedAt(LocalDateTime.now());
        inventoryCheckSlip.setNote(inventoryCheckRequest.getNote());

        Users users = userRepository.findById(inventoryCheckRequest.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User ID is invalid or null"));
        inventoryCheckSlip.setCreatedBy(users);

        List<InventoryCheckDetail> checkDetails= new ArrayList<>();
        for (InventoryCheckDetailRequest checkDetailRequest :inventoryCheckRequest.getCheckDetailList()){
            if (checkDetailRequest.getProductId() == null) {
                throw new IllegalArgumentException("Product ID must not be null");
            }
            InventoryCheckDetail inventoryCheckDetail=new InventoryCheckDetail();

            inventoryCheckDetail.setActualQuantity(checkDetailRequest.getActualQuantity());
            inventoryCheckDetail.setSystemQuantity(checkDetailRequest.getSystemQuantity());
            inventoryCheckDetail.setDifference(checkDetailRequest.getDifference());

            Product product = productRepository.findById(checkDetailRequest.getProductId())
                    .orElseThrow(() -> new IllegalArgumentException("Product ID is invalid"));

            inventoryCheckDetail.setProduct(product);

            inventoryCheckDetail.setInventoryCheckSlip(inventoryCheckSlip);

            checkDetails.add(inventoryCheckDetail);
            Inventory inventory = inventoryRepository.findLatestInventoryByProductId(product.getId()).
                    orElseThrow(() -> new IllegalArgumentException("Inventory ID is invalid or null"));


            if (inventory != null) {
                inventory.setQuantity(checkDetailRequest.getActualQuantity());
                inventoryRepository.save(inventory);
            }

        }
        inventoryCheckSlip.setDetailsListCheck(checkDetails);
       InventoryCheckSlip inventoryCheckSlip1= inventoryCheckRepository.save(inventoryCheckSlip);
        if (inventoryCheckSlip1!=null){
            return true;
        }
        return false;
    }

    private InventoryCheckResponse convertFromInventoryToInventoryCheckResponse(InventoryCheckSlip inventoryCheckSlip) {
        InventoryCheckResponse inventoryCheckResponse=new InventoryCheckResponse();

        inventoryCheckResponse.setId(inventoryCheckSlip.getId());
        inventoryCheckResponse.setNote(inventoryCheckSlip.getNote());
        inventoryCheckResponse.setCreatedAt(inventoryCheckSlip.getCreatedAt());

        Users users= inventoryCheckSlip.getCreatedBy();

        UserReponse userReponse =new UserReponse();
        userReponse.setId(users.getId());
        userReponse.setUsername(users.getUsername());
        userReponse.setPassword(users.getPassword());
        userReponse.setEmail(users.getEmail());
        userReponse.setPhone(users.getPhone());
        userReponse.setActive(users.isActive());
        userReponse.setDelete(users.isDelete());
        userReponse.setCreatAt(users.getCreatAt());
        userReponse.setUpdateAt(users.getUpdateAt());
        userReponse.setRole(users.getRole().getName());

        inventoryCheckResponse.setCreateUser(userReponse);

        List<InventoryCheckDetailResponse>checkDetailResponses=new ArrayList<>();

        for(InventoryCheckDetail checkDetail :inventoryCheckSlip.getDetailsListCheck()){

            InventoryCheckDetailResponse inventoryCheckDetailResponse=new InventoryCheckDetailResponse();
            inventoryCheckDetailResponse.setId(checkDetail.getId());
            inventoryCheckDetailResponse.setActualQuantity(checkDetail.getActualQuantity());
            inventoryCheckDetailResponse.setSystemQuantity(checkDetail.getSystemQuantity());
            inventoryCheckDetailResponse.setDifference(checkDetail.getDifference());
            inventoryCheckDetailResponse.setProductReponse(checkDetail.getProduct());
            checkDetailResponses.add(inventoryCheckDetailResponse);

        }
        inventoryCheckResponse.setCheckDetailRequestList(checkDetailResponses);
        return inventoryCheckResponse;

    }

}
