package com.example.app.stock_management.service.Impl;

import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.dto.response.CustomerReponse;
import com.example.app.stock_management.dto.response.InventoryListResponse;
import com.example.app.stock_management.dto.response.InventoryReponse;
import com.example.app.stock_management.entity.Customer;
import com.example.app.stock_management.entity.Inventory;
import com.example.app.stock_management.entity.Product;
import com.example.app.stock_management.repository.InventoryRepository;
import com.example.app.stock_management.repository.ProductRepository;
import com.example.app.stock_management.service.InventoryService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class InventoryServiceImpl implements InventoryService {


    @Autowired
    private InventoryRepository inventoryRepository;
    @Autowired
    private ProductRepository productRepository;

    //danh sach ton kho tất cả sản phầm
    @Override
    public List<InventoryReponse> GetListInventory() {
        List<Inventory> inventoryList = inventoryRepository.findAll();
        return inventoryList.stream().map(this::convertToInventoryReponse).collect(Collectors.toList());
    }

    //danh sách tồn kho sản phẩm mới nhất
    @Override
    public List<InventoryReponse> getLatestInventoryResponseList() {
        List<Inventory> inventories = inventoryRepository.findLatestInventoryEachProduct();
        List<InventoryReponse> responseList = new ArrayList<>();

        for (Inventory inventory : inventories) {
            InventoryReponse response = new InventoryReponse();
            response.setId(inventory.getId());
            response.setQuantity(inventory.getQuantity());
            response.setIsdelete(inventory.isIsdelete());
            response.setAvgPrice(inventory.getAvgPrice());

            Product product = inventory.getProduct();
            if (product != null) {
                Product fullProduct = productRepository.findById(product.getId());
                if (fullProduct != null) {
                    response.setProduct(fullProduct);
                } else {
                    // Optional: log warning hoặc xử lý nếu không tìm thấy Product
                    System.out.println("Product không tồn tại trong DB với id: " + product.getId());
                }
            } else {
                // Optional: xử lý nếu Inventory không có product liên kết
                System.out.println("Inventory không có thông tin Product.");
            }
            responseList.add(response);
        }

        return responseList;
    }

    //danh sách tồn kho sản phẩm mới nhất theo page


    @Override
    public PageResponse<InventoryReponse> getListProductInInventoryPage(int page, int size, String search) {
        if (search.isEmpty()){
            Pageable pageable = PageRequest.of(page -1, size, Sort.by("id").descending());
            Page<Inventory> inventoryPage = inventoryRepository.findByIsdeleteFalse(pageable);
            List<InventoryReponse> content = inventoryPage.getContent().stream()
                    .map(this::convertToInventoryReponse)
                    .collect(Collectors.toList());
            return new PageResponse(
                    content,
                    inventoryPage.getNumber()+1,//để chỉ số trang chả về từ 1
                    inventoryPage.getSize(),
                    inventoryPage.getTotalElements(),
                    inventoryPage.getTotalPages(),
                    inventoryPage.isLast()
            );
        }else {
            Pageable pageable = PageRequest.of(page -1, size, Sort.by("id").descending());
            Page<Inventory> inventoryPage = inventoryRepository.findLatestInventoryByProductNameOrCode(search,pageable);
            List<InventoryReponse> content = inventoryPage.getContent().stream()
                    .map(this::convertToInventoryReponse)
                    .collect(Collectors.toList());
            return new PageResponse(
                    content,
                    inventoryPage.getNumber()+1,//để chỉ số trang chả về từ 1
                    inventoryPage.getSize(),
                    inventoryPage.getTotalElements(),
                    inventoryPage.getTotalPages(),
                    inventoryPage.isLast()
            );
        }
    }

    //danh sách tồn kho cho phần xuất hàng
    @Override
    public List<InventoryListResponse> getListProductInInventory() {
        List<InventoryListResponse> responseList=inventoryRepository.getListProductInInventory();
        return responseList;
    }


    private InventoryReponse convertToInventoryReponse(Inventory inventory) {
        InventoryReponse inventoryReponse = new InventoryReponse();
        inventoryReponse.setId(inventory.getId());
        inventoryReponse.setQuantity(inventory.getQuantity());
        inventoryReponse.setAvgPrice(inventory.getAvgPrice());
        inventoryReponse.setIsdelete(inventory.isIsdelete());
        inventoryReponse.setProduct(inventory.getProduct());
        return inventoryReponse;

    }



}
