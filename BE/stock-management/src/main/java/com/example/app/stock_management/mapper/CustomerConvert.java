package com.example.app.stock_management.mapper;


import com.example.app.stock_management.dto.request.CustomerRequest;
import com.example.app.stock_management.dto.response.CustomerReponse;
import com.example.app.stock_management.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerConvert {

    private Customer customer;
    private CustomerReponse customerReponse;
    private CustomerRequest customerRequest;


    private CustomerReponse convertCustomerToCustomerReponse(Customer customer) {
        this.customerReponse.setId(customer.getId());
        this.customerReponse.setName(customer.getName());
        this.customerReponse.setAddress(customer.getAddress());
        this.customerReponse.setEmail(customer.getEmail());
        this.customerReponse.setPhone(customer.getPhone());
        this.customerReponse.setIsdelete(customer.isIsdelete());
        return customerReponse;
    }



}
