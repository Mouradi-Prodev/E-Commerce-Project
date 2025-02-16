package com.eilco.e_commerce.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryRequest {
    private String name;
    private String description;

}
