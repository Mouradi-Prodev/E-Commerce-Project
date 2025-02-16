package com.eilco.e_commerce.dto;

import com.eilco.e_commerce.model.Product;
import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class ProductResponse {
    private Product product;
}
