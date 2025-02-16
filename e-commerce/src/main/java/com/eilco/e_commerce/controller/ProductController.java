package com.eilco.e_commerce.controller;


import com.eilco.e_commerce.dto.ProductRequest;
import com.eilco.e_commerce.dto.ProductResponse;
import com.eilco.e_commerce.model.Product;
import com.eilco.e_commerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;




@RequiredArgsConstructor
@RestController
@RequestMapping("api/products")

public class ProductController {
    private final ProductService productService;



    @GetMapping("/all")
    public List<Product> index() {
        return productService.activeProducts();
    }

    @GetMapping("/{id}")
    public Optional<Product> show(@PathVariable String id) {
        return productService.getProductById(id);
    }




    @GetMapping("/latest")
    public List<Product> latestProducts() {
        return productService.getLatestProducts(6);
    }
}
