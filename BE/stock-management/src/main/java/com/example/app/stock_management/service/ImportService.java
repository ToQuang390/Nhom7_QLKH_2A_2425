package com.example.app.stock_management.service;

import com.example.app.stock_management.dto.common.PageResponse;
import com.example.app.stock_management.dto.request.ImportRequest;
import com.example.app.stock_management.dto.response.ImportDetailResponse;
import com.example.app.stock_management.dto.response.ImportResponse;
import com.example.app.stock_management.entity.Import;

import java.time.LocalDateTime;
import java.util.List;

public interface ImportService {

    ImportResponse createImport(ImportRequest importRequest);
    List<ImportResponse> getAllImports();
    boolean deleteImport(int id);
    PageResponse<ImportResponse> getListPageImport(LocalDateTime fromDate, LocalDateTime toDate, int page , int size , String search);
}
