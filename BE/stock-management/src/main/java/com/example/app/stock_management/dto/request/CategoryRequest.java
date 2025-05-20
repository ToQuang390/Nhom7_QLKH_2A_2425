package com.example.app.stock_management.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequest {
    private int id;
    private String name;
    private String description;
    @JsonFormat(pattern = "yyyy-MM-dd ")
    private LocalDateTime createdAt;
//    private LocalDateTime updateAt;
    private boolean isdelete;

}
