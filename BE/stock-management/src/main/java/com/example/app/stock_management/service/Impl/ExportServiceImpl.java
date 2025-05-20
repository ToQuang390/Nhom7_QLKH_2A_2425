package com.example.app.stock_management.service.Impl;

import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.dto.request.ExportDetailRequest;
import com.example.app.stock_management.dto.request.ExportRequest;
import com.example.app.stock_management.dto.request.ImportDetailRequest;
import com.example.app.stock_management.dto.response.*;
import com.example.app.stock_management.entity.*;
import com.example.app.stock_management.repository.*;
import com.example.app.stock_management.service.ExportService;
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
public class ExportServiceImpl implements ExportService {

    @Autowired
    private ExportRepository exportRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private InventoryRepository inventoryRepository;


    @Override
    public List<ExportResponse> getAllExports() {
        List<Export> exports = exportRepository.findAll();
       return exports.stream().map(this::convertToExportResponse).collect(Collectors.toList());
    }

    @Override
    public PageResponse<ExportResponse> getListPageExport(LocalDateTime fromDate, LocalDateTime toDate, int page, int size, String search) {

        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("id").descending());
        Page<Export>exportsPage;

        boolean hasSearch = search != null && !search.trim().isEmpty();
        boolean hasDateRange = fromDate != null && toDate != null;

        if (hasSearch && hasDateRange) {
            // Tìm kiếm theo keyword và khoảng thời gian
            exportsPage = exportRepository.searchByKeywordAndDate(search, fromDate, toDate, pageable);
        } else if (hasSearch) {
            // Tìm kiếm theo keyword
            exportsPage = exportRepository.findByKey(search, pageable);
        } else if (hasDateRange) {
            // Tìm kiếm theo ngày tạo
            exportsPage = exportRepository.findByCreatedAtBetween(fromDate, toDate, pageable);
        } else {
            // Không có gì, lấy tất cả
            exportsPage = exportRepository.getListPage(pageable);
        }
        List<ExportResponse> responseList = exportsPage.stream()
                .map(this::convertToExportResponse)
                .collect(Collectors.toList());

        return new PageResponse<>(
                responseList,
                exportsPage.getNumber() + 1,
                exportsPage.getSize(),
                exportsPage.getTotalElements(),
                exportsPage.getTotalPages(),
                exportsPage.isLast()
        );
    }

    @Override
    @Transactional
    public ExportResponse createExport(ExportRequest exportRequest) {

        Export export = new Export();

        export.setTotal(exportRequest.getTotal());
        export.setDescription(exportRequest.getDescription());
        export.setCreatedAt(LocalDateTime.now());
        export.setDelete(false);

        Customer customer= customerRepository.findById(exportRequest.getCustomerId());
        if(customer != null){
            export.setCustomer(customer);
        }
        Users user = userRepository.findById(exportRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        export.setUser(user);

        // Tạo danh sách chi tiết xuất  hàng
        List<ExportDetail> details = new ArrayList<>();
        for (ExportDetailRequest detailDTO : exportRequest.getExportDetailList()) {

            ExportDetail detail = new ExportDetail();

            detail.setAvgPrice(detailDTO.getAvgPrice());
            detail.setQuantity(detailDTO.getQuantity());
            detail.setPrice(detailDTO.getPrice());

            Product product = productRepository.findById(detailDTO.getProductId());
            detail.setProduct(product);
            detail.setExportSlip(export);

            details.add(detail);
        }
        export.setExportDetailList(details);

        //  Cập nhật tồn kho cho từng sản phẩm
        for (ExportDetail detail : details) {
            Product product = detail.getProduct();
            Inventory lastInventory  = inventoryRepository.findTopByProductIdOrderByCreatedAtDesc(product.getId());

            int quantity = lastInventory.getQuantity();
            int exportQuantity = detail.getQuantity();
            lastInventory.setQuantity(quantity - exportQuantity);
        }
        Export res= exportRepository.save(export);

        return convertToExportResponse(res);
    }

    private ExportResponse convertToExportResponse(Export exportSlip) {

        ExportResponse response = new ExportResponse();
        response.setId(exportSlip.getId());
        response.setTotal(exportSlip.getTotal());
        response.setDescription(exportSlip.getDescription());
        response.setCreatedAt(exportSlip.getCreatedAt());
        response.setDelete(exportSlip.isDelete());
        response.setCreatedAt(exportSlip.getCreatedAt());
        response.setUpdateAt(exportSlip.getUpdateAt());

        response.setCustomer(exportSlip.getCustomer());

        UserReponse userReponse = new UserReponse();

        userReponse.setId(exportSlip.getUser().getId());
        userReponse.setUsername(exportSlip.getUser().getUsername());
        userReponse.setEmail(exportSlip.getUser().getEmail());
        userReponse.setPhone(exportSlip.getUser().getPhone());
        userReponse.setRole(exportSlip.getUser().getRole().getName());
        userReponse.setActive(exportSlip.getUser().isActive());
        userReponse.setDelete(exportSlip.getUser().isDelete());
        userReponse.setPassword(exportSlip.getUser().getPassword());
        userReponse.setCreatAt(exportSlip.getUser().getCreatAt());
        userReponse.setUpdateAt(exportSlip.getUser().getUpdateAt());

        response.setUser(userReponse);

        List<ExportDetailResponse> details = new ArrayList<>();

        for (ExportDetail detailDTO : exportSlip.getExportDetailList()) {
            ExportDetailResponse detailResponse = new ExportDetailResponse();

            detailResponse.setId(detailDTO.getId());
            detailResponse.setQuantity(detailDTO.getQuantity());
            detailResponse.setPrice(detailDTO.getPrice());
            detailResponse.setAvgPrice(detailDTO.getAvgPrice());

            //gán thông số sản phẩm
            Product product = detailDTO.getProduct();
            ProductReponse productReponse = new ProductReponse();
            productReponse.setId(product.getId());
            productReponse.setProductCode(product.getProductCode());
            productReponse.setName(product.getName());
            productReponse.setDescription(product.getDescription());
            productReponse.setCreatedAt(product.getCreatedAt());
            productReponse.setUpdateAt(product.getUpdateAt());

            // Gắn category
            if (product.getCategory() != null) {
                CategoryReponse categoryReponse = new CategoryReponse();
                categoryReponse.setId(product.getCategory().getId());
                categoryReponse.setName(product.getCategory().getName());
                categoryReponse.setDescription(product.getCategory().getDescription());
                categoryReponse.setCreatedAt(product.getCategory().getCreatedAt());
                categoryReponse.setIsdelete(product.getCategory().isIsdelete());
                productReponse.setCategoryReponse(categoryReponse);
            }

            // Gắn unit (kiểm tra null trước)
            if (product.getUnit() != null) {
                UnitReponse unitReponse = new UnitReponse();
                unitReponse.setId(product.getUnit().getId());
                unitReponse.setName(product.getUnit().getName());
                unitReponse.setDescription(product.getUnit().getDescription());
                unitReponse.setDelete(product.getUnit().isDelete());
                productReponse.setUnitReponse(unitReponse);
            } else {
                productReponse.setUnitReponse(null);
            }
            productReponse.setDelete(product.isDelete());
            detailResponse.setProduct(productReponse);
            details.add(detailResponse);
        }

        response.setExportDetailList(details);
        return response;

    }

}
