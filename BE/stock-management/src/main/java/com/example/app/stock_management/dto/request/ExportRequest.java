package com.example.app.stock_management.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ExportRequest {
    private int customerId;
    private BigDecimal total;
    private String description;
    private boolean isDelete;
    private LocalDateTime createdAt;
    private LocalDateTime updateAt;
    private int userId;
    private List<ExportDetailRequest> exportDetailList;
}
