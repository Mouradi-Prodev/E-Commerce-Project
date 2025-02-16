package com.eilco.e_commerce.controller;


import com.eilco.e_commerce.dto.CategoryRequest;
import com.eilco.e_commerce.dto.CategoryResponse;
import com.eilco.e_commerce.model.Category;
import com.eilco.e_commerce.model.Product;
import com.eilco.e_commerce.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public List<Category> index(){
        return categoryService.getAllCategories();
    }



    @GetMapping("/{id}")
    public Category show(@PathVariable String id) {
        return categoryService.getCategoryById(id);
    }


    @GetMapping("/{id}/products")
    public List<Product> getProducts(@PathVariable String id)
    {
        return categoryService.getProducts(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id)
    {
        categoryService.deleteCategory(id);
    }



}
