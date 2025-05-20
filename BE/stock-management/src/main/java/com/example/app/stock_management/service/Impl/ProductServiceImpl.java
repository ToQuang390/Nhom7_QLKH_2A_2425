package com.example.app.stock_management.service.Impl;

import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.dto.request.ProductRequest;
import com.example.app.stock_management.dto.response.CategoryReponse;
import com.example.app.stock_management.dto.response.CustomerReponse;
import com.example.app.stock_management.dto.response.ProductReponse;
import com.example.app.stock_management.dto.response.UnitReponse;
import com.example.app.stock_management.entity.Category;
import com.example.app.stock_management.entity.Customer;
import com.example.app.stock_management.entity.Product;
import com.example.app.stock_management.entity.UnitType;
import com.example.app.stock_management.repository.CategoryRepository;
import com.example.app.stock_management.repository.ProductRepository;
import com.example.app.stock_management.repository.UnitRepository;
import com.example.app.stock_management.service.CategoryService;
import com.example.app.stock_management.service.ProductService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UnitRepository unitRepository;

    @Override
    public List<ProductReponse> getAllProducts() {
        List<Product> products = productRepository.getAllProduct();
        return  products.stream().map(this::convertToProductReponse).collect(Collectors.toList());
    }

    //phân trang
    @Override
    public PageResponse<ProductReponse> getAllProductPage(int page, int size, String search) {
        if (search.isEmpty()){
            Pageable pageable = PageRequest.of(page -1, size, Sort.by("id").descending());
            Page<Product> productPage = productRepository.findByIsDeleteFalse(pageable);
            List<ProductReponse> content = productPage.getContent().stream()
                    .map(this::convertToProductReponse)
                    .collect(Collectors.toList());

            return new PageResponse(
                    content,
                    productPage.getNumber()+1,//để chỉ số trang chả về từ 1
                    productPage.getSize(),
                    productPage.getTotalElements(),
                    productPage.getTotalPages(),
                    productPage.isLast()
            );
        }else {
            Pageable pageable = PageRequest.of(page -1, size, Sort.by("id").descending());
            Page<Product> productPage = productRepository.findByNameAndProductCode(search,pageable);
            List<ProductReponse> content = productPage.getContent().stream()
                    .map(this::convertToProductReponse)
                    .collect(Collectors.toList());
            return new PageResponse(
                    content,
                    productPage.getNumber()+1,//để chỉ số trang chả về từ 1
                    productPage.getSize(),
                    productPage.getTotalElements(),
                    productPage.getTotalPages(),
                    productPage.isLast()
            );
        }
    }

    @Override
    @Transactional
    public ProductReponse addProduct(ProductRequest productRequest) {
        Product product = new Product();
        product.setName(productRequest.getName());
        product.setProductCode(productRequest.getProductCode());
        product.setDescription(productRequest.getDescription());
        product.setCreatedAt(LocalDateTime.now());
        product.setDelete(false);
        Category category = categoryRepository.findById(productRequest.getCategoryId());
        product.setCategory(category);
        UnitType unitType=unitRepository.findById(productRequest.getUnitId());
        product.setUnit(unitType);
        Product reponse= productRepository.save(product);
        return convertToProductReponse(reponse);
    }

    @Override
    @Transactional
    public ProductReponse updateProduct(ProductRequest productRequest) {
        Product product = productRepository.findById(productRequest.getId());
        product.setName(productRequest.getName());
        product.setProductCode(productRequest.getProductCode());
        product.setDescription(productRequest.getDescription());
        product.setUpdateAt(LocalDateTime.now());
        Category category = categoryRepository.findById(productRequest.getCategoryId());
        product.setCategory(category);
        UnitType unitType=unitRepository.findById(productRequest.getUnitId());
        product.setUnit(unitType);
        return convertToProductReponse(productRepository.save(product));
    }

    @Override
    @Transactional
    public boolean deleteProduct(int id) {
        Product product = productRepository.findById(id);
        product.setDelete(true);
        Product productres =   productRepository.save(product);
        return true;
    }

    //convert from Product -> ProductReponse
    private  ProductReponse convertToProductReponse(Product product) {
        ProductReponse productReponse = new ProductReponse();
        productReponse.setId(product.getId());
        productReponse.setName(product.getName());
        productReponse.setProductCode(product.getProductCode());
        productReponse.setDescription(product.getDescription());
        productReponse.setCreatedAt(product.getCreatedAt());
        productReponse.setUpdateAt(product.getUpdateAt());
        productReponse.setDelete(product.isDelete());

        Category category = product.getCategory();
        if (category != null) {
            CategoryReponse categoryReponse = new CategoryReponse();
            categoryReponse.setId(category.getId());
            categoryReponse.setName(category.getName());
            categoryReponse.setDescription(category.getDescription());
            categoryReponse.setCreatedAt(category.getCreatedAt());
            productReponse.setCategoryReponse(categoryReponse);
        } else {
            productReponse.setCategoryReponse(null); // hoặc bạn có thể tạo một CategoryReponse mặc định
        }
        if(product.getUnit() != null) {
            UnitReponse unitReponse = new UnitReponse();
            unitReponse.setId(product.getUnit().getId());
            unitReponse.setName(product.getUnit().getName());
            unitReponse.setDescription(product.getUnit().getDescription());
            unitReponse.setDelete(product.getUnit().isDelete());
            productReponse.setUnitReponse(unitReponse);
        }else {
            productReponse.setUnitReponse(null); // hoặc bạn có thể tạo một CategoryReponse mặc định
        }

        return productReponse;
    }



}
