package com.example.app.stock_management.service.Impl;

import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.dto.request.SupplierRequest;
import com.example.app.stock_management.dto.response.CustomerReponse;
import com.example.app.stock_management.dto.response.SupplierResponse;
import com.example.app.stock_management.entity.Customer;
import com.example.app.stock_management.entity.Suppliers;
import com.example.app.stock_management.repository.SuppliersRepository;
import com.example.app.stock_management.service.SupplierService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class SupplierServiceImpl implements SupplierService {

@Autowired
private SuppliersRepository suppliersRepository;

    @Override
    public List<SupplierResponse> getSupplierAll() {
        List<Suppliers> suppliersList = suppliersRepository.getAllSupplier();
        return suppliersList.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public PageResponse<SupplierResponse> getAllSuppliersPage(int page, int size, String search) {
        if (search.isEmpty()){
            Pageable pageable = PageRequest.of(page -1, size, Sort.by("id").descending());
            Page<Suppliers> supplierPage = suppliersRepository.findByIsDeleteFalse(pageable);
            List<SupplierResponse> content = supplierPage.getContent().stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());

            return new PageResponse(
                    content,
                    supplierPage.getNumber()+1,//để chỉ số trang chả về từ 1
                    supplierPage.getSize(),
                    supplierPage.getTotalElements(),
                    supplierPage.getTotalPages(),
                    supplierPage.isLast()
            );
        }else {
            Pageable pageable = PageRequest.of(page -1, size, Sort.by("id").descending());
            Page<Suppliers> supplierPage = suppliersRepository.findBySAndSupplier_nameOrSAndSupplier_code(search,pageable);
            List<SupplierResponse> content = supplierPage.getContent().stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            return new PageResponse(
                    content,
                    supplierPage.getNumber()+1,//để chỉ số trang chả về từ 1
                    supplierPage.getSize(),
                    supplierPage.getTotalElements(),
                    supplierPage.getTotalPages(),
                    supplierPage.isLast()
            );
        }


    }

    @Override
    @Transactional
    public SupplierResponse addSuppliers(SupplierRequest supplierRequest) {
        Suppliers suppliers = new Suppliers();
        suppliers.setSupplier_code(supplierRequest.getSupplierCode());
        suppliers.setSupplier_name(supplierRequest.getSupplierName());
        suppliers.setPhone(supplierRequest.getPhone());
        suppliers.setAddress(supplierRequest.getAddress());
        suppliers.setDelete(supplierRequest.isIsdelete());
        suppliers.setEmail(supplierRequest.getEmail());
        Suppliers response= suppliersRepository.save(suppliers);
        SupplierResponse supplierResponse=convertToDTO(response);
        return supplierResponse;
    }


    @Override
    public SupplierResponse getSupplierById(int id) {
        Suppliers suppliers = suppliersRepository.findById(id).get();
        SupplierResponse response=convertToDTO(suppliers);
        return response;
    }


    @Override
    public SupplierResponse updateSupplier(SupplierRequest supplierRequest) {
        Suppliers suppliers = suppliersRepository.findById(supplierRequest.getId()).get();
        suppliers.setSupplier_name(supplierRequest.getSupplierName());
        suppliers.setSupplier_code(supplierRequest.getSupplierCode());
        suppliers.setEmail(supplierRequest.getEmail());
        suppliers.setAddress( supplierRequest.getAddress());
        suppliers.setDelete(supplierRequest.isIsdelete());
        suppliers.setPhone(supplierRequest.getPhone());

        Suppliers response= suppliersRepository.save(suppliers);
        SupplierResponse supplierResponse=convertToDTO(response);
        return supplierResponse;

    }

    @Override
    public boolean deleteSupplier(int id) {
        Suppliers suppliers = suppliersRepository.findById(id).get();
        suppliers.setDelete(true);
        Suppliers supplier=  suppliersRepository.saveAndFlush(suppliers);
        if (supplier!=null) {
            return true;
        }
        return false;
    }

    private SupplierResponse convertToDTO(Suppliers suppliers) {
        SupplierResponse supplierResponse = new SupplierResponse();
        supplierResponse.setId(suppliers.getId());
        supplierResponse.setSupplierCode(suppliers.getSupplier_code());
        supplierResponse.setSupplierName(suppliers.getSupplier_name());
        supplierResponse.setPhone(suppliers.getPhone());
        supplierResponse.setEmail(suppliers.getEmail());
        supplierResponse.setAddress(suppliers.getAddress());
        supplierResponse.setDelete(suppliers.isDelete());
        return supplierResponse;
    }



}
