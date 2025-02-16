package com.eilco.e_commerce.dto;

import com.eilco.e_commerce.model.Category;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CategoryResponse {
    private Category category;
}
