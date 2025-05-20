package com.example.app.stock_management.service;

import com.example.app.stock_management.dto.request.CustomerRequest;

import com.example.app.stock_management.dto.response.CustomerReponse;
import com.example.app.stock_management.dto.common.PageResponse;

import java.util.List;

public interface CustomerService {

    List<CustomerReponse> getAllCustomers();
    CustomerReponse addCustomer(CustomerRequest customer);
    CustomerReponse updateCustomer(CustomerRequest customer);
    boolean deleteCustomer(int id);
    PageResponse<CustomerReponse> getAllCustomerPage(int page, int size,String search );
}
