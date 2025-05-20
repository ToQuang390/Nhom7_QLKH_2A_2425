package com.example.app.stock_management.dto.request;


import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ImportRequest {

    private int supplierId;
    private BigDecimal total;
    private String description;
    private boolean isDelete;
    private LocalDateTime createdAt;
    private LocalDateTime updateAt;
    private int userId;
    private List<ImportDetailRequest> importDetailList;


}
