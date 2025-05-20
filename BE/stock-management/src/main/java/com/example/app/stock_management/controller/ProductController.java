package com.example.app.stock_management.controller;

import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.dto.request.ProductRequest;
import com.example.app.stock_management.dto.response.CustomerReponse;
import com.example.app.stock_management.dto.response.ProductReponse;
import com.example.app.stock_management.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<ProductReponse> getProducts() {
        List<ProductReponse>productReponses =productService.getAllProducts();
        return productReponses;
    }

    @GetMapping("/list")
    public ResponseEntity<PageResponse<ProductReponse>> getAllCustomers(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search
    ) {
        PageResponse<ProductReponse> response = productService.getAllProductPage(page, size,search);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ProductReponse addProduct(@RequestBody ProductRequest productRequest) {
        ProductReponse reponse=productService.addProduct(productRequest);
        return reponse;
    }

    @PutMapping
    public ProductReponse updateProduct(@RequestBody ProductRequest productRequest) {
        ProductReponse reponse=productService.updateProduct(productRequest);
        return reponse;
    }

    @DeleteMapping(value = "/{id}")
    public boolean deleteProduct(@PathVariable("id") int id) {
        boolean status = productService.deleteProduct(id);
        if(status){
            return true;
        }
        return false;
    }


}
