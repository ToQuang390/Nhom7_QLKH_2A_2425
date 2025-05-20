package com.example.app.stock_management.service;

import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.dto.request.ProductRequest;
import com.example.app.stock_management.dto.response.CustomerReponse;
import com.example.app.stock_management.dto.response.ProductReponse;

import java.util.List;

public interface ProductService {
    List<ProductReponse> getAllProducts();
    ProductReponse addProduct(ProductRequest productRequest);
    ProductReponse updateProduct(ProductRequest productRequest);
    boolean deleteProduct(int id);
    PageResponse<ProductReponse> getAllProductPage(int page, int size, String search );

}
