package com.example.app.stock_management.service.Impl;

import com.example.app.stock_management.dto.request.CustomerRequest;
import com.example.app.stock_management.dto.response.CustomerReponse;
import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.entity.Customer;
import com.example.app.stock_management.repository.CustomerRepository;
import com.example.app.stock_management.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    //lay danh sach khach hang
    @Override
    public List<CustomerReponse> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
      return  customers.stream().map(this::convertCustomerToCustomerReponse).collect(Collectors.toList());
    }

    //lay danh sach theo trang
    @Override
    public PageResponse<CustomerReponse> getAllCustomerPage(int page, int size,String search) {
        if (search.isEmpty()){
            Pageable pageable = PageRequest.of(page -1, size, Sort.by("id").descending());
            Page<Customer> customerPage = customerRepository.findByIsdeleteFalse(pageable);
            List<CustomerReponse> content = customerPage.getContent().stream()
                    .map(this::convertCustomerToCustomerReponse)
                    .collect(Collectors.toList());
            return new PageResponse(
                    content,
                    customerPage.getNumber()+1,//để chỉ số trang chả về từ 1
                    customerPage.getSize(),
                    customerPage.getTotalElements(),
                    customerPage.getTotalPages(),
                    customerPage.isLast()
            );
        }else {
            Pageable pageable = PageRequest.of(page -1, size, Sort.by("id").descending());
            Page<Customer> customerPage = customerRepository.findByNameOrPhone(search,pageable);
            List<CustomerReponse> content = customerPage.getContent().stream()
                    .map(this::convertCustomerToCustomerReponse)
                    .collect(Collectors.toList());
            return new PageResponse(
                    content,
                    customerPage.getNumber()+1,//để chỉ số trang chả về từ 1
                    customerPage.getSize(),
                    customerPage.getTotalElements(),
                    customerPage.getTotalPages(),
                    customerPage.isLast()
            );
        }
    }

    //them khach hang
    @Override
    @Transactional
    public CustomerReponse addCustomer(CustomerRequest customerRq) {
        Customer customer =convertCustomerRequestToCustomer(customerRq);
        Customer customerRse= customerRepository.save(customer);
        return convertCustomerToCustomerReponse(customerRse);
    }

    @Override
    @Transactional
    public CustomerReponse updateCustomer(CustomerRequest customer) {
        Customer cust =customerRepository.findById(customer.getId());
        cust.setName(customer.getName());
        cust.setPhone(customer.getPhone());
        cust.setEmail(customer.getEmail());
        cust.setAddress(customer.getAddress());
        Customer customerRse= customerRepository.save(cust);
        CustomerReponse reponse= convertCustomerToCustomerReponse(customerRse);
        return reponse;
    }

    @Override
    @Transactional
    public boolean deleteCustomer(int id) {
        Customer customer = customerRepository.findById(id);
        customer.setIsdelete(true);
       Customer customerrep= customerRepository.save(customer);
       if (customerrep!=null) {
           return true;
       }
        return false;
    }

    //Customer -> CustomerReponse
    private CustomerReponse convertCustomerToCustomerReponse(Customer customer) {
        CustomerReponse customerReponse = new CustomerReponse();
        customerReponse.setId(customer.getId());
        customerReponse.setName(customer.getName());
        customerReponse.setAddress(customer.getAddress());
        customerReponse.setEmail(customer.getEmail());
        customerReponse.setPhone(customer.getPhone());
        customerReponse.setIsdelete(customer.isIsdelete());
        return customerReponse;
    }
    //CustomerRequest -> Customer
    private Customer convertCustomerRequestToCustomer(CustomerRequest customerR) {
        Customer customer = new Customer();
        customer.setId(customerR.getId());
        customer.setName(customerR.getName());
        customer.setAddress(customerR.getAddress());
        customer.setEmail(customerR.getEmail());
        customer.setPhone(customerR.getPhone());
        customer.setIsdelete(customerR.isIsdelete());
        return customer;
    }


}
