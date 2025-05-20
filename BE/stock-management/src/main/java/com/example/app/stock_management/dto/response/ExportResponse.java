package com.example.app.stock_management.dto.response;

import com.example.app.stock_management.entity.Customer;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ExportResponse {

    private int id;
    private BigDecimal total;
    private String description;
    private boolean isDelete;

    @JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
    private LocalDateTime createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd ")
    private LocalDateTime updateAt;
    private Customer customer;
    private UserReponse user;
    private List<ExportDetailResponse> exportDetailList;
}
