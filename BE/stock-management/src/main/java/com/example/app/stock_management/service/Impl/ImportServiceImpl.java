package com.example.app.stock_management.service.Impl;

import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.dto.request.ImportRequest;
import com.example.app.stock_management.dto.request.ImportDetailRequest;
import com.example.app.stock_management.dto.response.*;
import com.example.app.stock_management.entity.*;
import com.example.app.stock_management.repository.*;
import com.example.app.stock_management.service.ImportService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImportServiceImpl implements ImportService {

    @Autowired
    private ImportRepository importRepository;

    @Autowired
    private SuppliersRepository suppliersRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public List<ImportResponse> getAllImports() {
        List<Import> imports = importRepository.findAll();
        return imports.stream().map(this::convertToImportResponse).collect(Collectors.toList());
    }

    @Override
    public PageResponse<ImportResponse> getListPageImport(LocalDateTime fromDate, LocalDateTime toDate,int page, int size, String search) {
           Pageable pageable = PageRequest.of(page - 1, size, Sort.by("id").descending());
           Page<Import> importsPage;
           boolean hasSearch = search != null && !search.trim().isEmpty();
           boolean hasDateRange = fromDate != null && toDate != null;

           if (hasSearch && hasDateRange) {
               // Tìm kiếm theo keyword và khoảng thời gian
               importsPage = importRepository.searchByKeywordAndDate(search, fromDate, toDate, pageable);
           } else if (hasSearch) {
               // Tìm kiếm theo keyword
               importsPage = importRepository.findByKey(search, pageable);
           } else if (hasDateRange) {
               // Tìm kiếm theo ngày tạo
               importsPage = importRepository.findByCreatedAtBetween(fromDate, toDate, pageable);
           } else {
               // Không có gì, lấy tất cả
               importsPage = importRepository.getListPage(pageable);
           }
           List<ImportResponse> responseList = importsPage.stream()
                   .map(this::convertToImportResponse)
                   .collect(Collectors.toList());

           return new PageResponse<>(
                   responseList,
                   importsPage.getNumber() + 1,
                   importsPage.getSize(),
                   importsPage.getTotalElements(),
                   importsPage.getTotalPages(),
                   importsPage.isLast()
           );
    }

    @Override
    @Transactional
    public ImportResponse createImport(ImportRequest importRequest) {
        Import importSlip = new Import();

        importSlip.setTotal(importRequest.getTotal());
        importSlip.setDescription(importRequest.getDescription());
        importSlip.setCreatedAt(LocalDateTime.now());
        importSlip.setDelete(false);

        // Lấy thông tin supplier và user
        Suppliers supplier = suppliersRepository.findById(importRequest.getSupplierId())
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        Users user = userRepository.findById(importRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        importSlip.setSupplier(supplier);
        importSlip.setUser(user);

        // Tạo danh sách chi tiết nhập hàng
        List<ImportDetail> details = new ArrayList<>();
        for (ImportDetailRequest detailDTO : importRequest.getImportDetailList()) {
            ImportDetail detail = new ImportDetail();
            detail.setQuantity(detailDTO.getQuantity());
            detail.setPrice(detailDTO.getPrice());

            Product product = productRepository.findById(detailDTO.getProductId());
            detail.setProduct(product);
            detail.setImportSlip(importSlip);
            details.add(detail);
        }

        importSlip.setImportDetailList(details);

        //  Cập nhật tồn kho cho từng sản phẩm
        for (ImportDetail detail : details) {

            Product product = detail.getProduct();
            Inventory lastInventory  = inventoryRepository.findTopByProductIdOrderByCreatedAtDesc(product.getId());

            Inventory newInventory = new Inventory();
            newInventory.setProduct(product);
            newInventory.setIsdelete(false);
            newInventory.setCreatedAt(LocalDateTime.now());

            int oldQuantity = 0;
            BigDecimal oldAvgPrice = BigDecimal.ZERO;

            if (lastInventory != null) {
                oldQuantity = lastInventory.getQuantity();
                oldAvgPrice = lastInventory.getAvgPrice() != null ? lastInventory.getAvgPrice() : BigDecimal.ZERO;
            }

            // Lưu số lượng cũ trước khi cập nhật
            int importQuantity = detail.getQuantity();
            BigDecimal importPrice = detail.getPrice();

            int newQuantity = oldQuantity + importQuantity;
            newInventory.setQuantity(newQuantity);

         //Tính giá trung bình gia quyền
            BigDecimal totalOld = oldAvgPrice.multiply(BigDecimal.valueOf(oldQuantity));
            BigDecimal totalNew = importPrice.multiply(BigDecimal.valueOf(importQuantity));

            BigDecimal avgPrice = oldQuantity == 0
                    ? importPrice
                    : totalOld.add(totalNew).divide(BigDecimal.valueOf(newQuantity), 2, RoundingMode.HALF_UP);

            newInventory.setAvgPrice(avgPrice);
            inventoryRepository.save(newInventory);
        }
        Import res= importRepository.save(importSlip);
        ImportResponse response=convertToImportResponse(res);
        return response;
    }

    @Override
    public boolean deleteImport(int id) {
        Import del=importRepository.findById(id).orElseThrow(() -> new RuntimeException("Import not found"));
        // Xóa phiếu nhập
        importRepository.delete(del);
        // Kiểm tra xem đối tượng đã bị xóa chưa
        boolean existsAfterDelete = importRepository.existsById(id);
        if (existsAfterDelete) {
            return false;
        }
        return true;
    }

    private ImportResponse convertToImportResponse(Import importSlip) {
        ImportResponse importResponse = new ImportResponse();

        importResponse.setId(importSlip.getId());
        importResponse.setTotal(importSlip.getTotal());
        importResponse.setDescription(importSlip.getDescription());
        importResponse.setCreatedAt(importSlip.getCreatedAt());
        importResponse.setUpdateAt(importSlip.getUpdateAt());
        importResponse.setDelete(importSlip.isDelete());

        importResponse.setSupplier(new SupplierResponse(
                importSlip.getSupplier().getId(),
                importSlip.getSupplier().getSupplier_code(),
                importSlip.getSupplier().getSupplier_name(),
                importSlip.getSupplier().getPhone(),
                importSlip.getSupplier().getEmail(),
                importSlip.getSupplier().getAddress(),
                importSlip.getSupplier().isDelete()
        ));

        UserReponse userReponse = new UserReponse();

        userReponse.setId(importSlip.getUser().getId());
        userReponse.setUsername(importSlip.getUser().getUsername());
        userReponse.setEmail(importSlip.getUser().getEmail());
        userReponse.setPhone(importSlip.getUser().getPhone());
        userReponse.setRole(importSlip.getUser().getRole().getName());
        userReponse.setActive(importSlip.getUser().isActive());
        userReponse.setDelete(importSlip.getUser().isDelete());
        userReponse.setPassword(importSlip.getUser().getPassword());
        userReponse.setCreatAt(importSlip.getUser().getCreatAt());
        userReponse.setUpdateAt(importSlip.getUser().getUpdateAt());


        importResponse.setUser(userReponse);

        List<ImportDetailResponse> details = new ArrayList<>();
        for (ImportDetail detailDTO : importSlip.getImportDetailList()) {

            ImportDetailResponse detailResponse = new ImportDetailResponse();
            detailResponse.setId(detailDTO.getId());
            detailResponse.setQuantity(detailDTO.getQuantity());
            detailResponse.setPrice(detailDTO.getPrice());

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
            detailResponse.setProductReponse(productReponse);

            details.add(detailResponse);
        }

        importResponse.setImportDetailList(details);
        return importResponse;
    }
}
