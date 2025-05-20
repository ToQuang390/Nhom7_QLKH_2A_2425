package com.example.app.stock_management.controller;

import com.example.app.stock_management.dto.request.CustomerRequest;
import com.example.app.stock_management.dto.response.CustomerReponse;
import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;


    @GetMapping
    public List<CustomerReponse> getCustomer() {
        List<CustomerReponse> reponseList=customerService.getAllCustomers();
        return reponseList;
    }

    //phân trang
    @GetMapping(value = "/list")
    public ResponseEntity<PageResponse<CustomerReponse>> getAllCustomers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search
    ) {
        PageResponse<CustomerReponse> response = customerService.getAllCustomerPage(page, size,search);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public CustomerReponse addCustomer(@RequestBody CustomerRequest customerRq) {
        CustomerReponse customerReponse=customerService.addCustomer(customerRq);
        return customerReponse;
    }

    @PutMapping
    public CustomerReponse updateCustomer(@RequestBody CustomerRequest customerRq) {
        CustomerReponse customerReponse=customerService.updateCustomer(customerRq);
        return customerReponse;
    }

    @DeleteMapping(value = "/{id}")
    public boolean deleteCustomer(@PathVariable int id) {
        boolean isCheck= customerService.deleteCustomer(id);
        if(isCheck){
            return true;
        }
        return false;
    }

}
