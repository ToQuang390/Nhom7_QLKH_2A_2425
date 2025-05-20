package com.example.app.stock_management.dto.response;

import com.example.app.stock_management.dto.request.InventoryCheckDetailRequest;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class InventoryCheckResponse {

    private int id;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    private String note;

    private UserReponse createUser;

    private List<InventoryCheckDetailResponse> checkDetailRequestList;
}
