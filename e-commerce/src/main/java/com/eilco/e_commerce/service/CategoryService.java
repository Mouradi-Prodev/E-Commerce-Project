package com.eilco.e_commerce.service;


import com.eilco.e_commerce.dto.CategoryRequest;
import com.eilco.e_commerce.model.Category;
import com.eilco.e_commerce.model.Product;
import com.eilco.e_commerce.repository.CategoryRepository;
import com.eilco.e_commerce.repository.ProductRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Data
@Service
@Builder
public class CategoryService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private  CategoryRepository categoryRepository;


    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }


    public Category getCategoryById(String id) {
        return categoryRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Category not found")
        );
    }


    public Category saveCategory(CategoryRequest category) {
        return categoryRepository.save(convertToCategory(category, null));
    }


    public Category updateCategory(CategoryRequest categoryRequest, String id) {

        return categoryRepository.save(convertToCategory(categoryRequest, id));
    }


    public void deleteCategory(String id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));


        List<Product> products = productRepository.findByCategory(category);
        for (Product product : products) {
            product.setCategory(null);
            productRepository.save(product);
        }
        categoryRepository.deleteById(id);
    }

    public List<Product> getProducts(String id)
    {
        Category category = categoryRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Category not found")
        );
        return category.getProducts();
    }

    private Category convertToCategory(CategoryRequest categoryRequest ,String id)
    {

        return Category.builder()
                .id(id)
                .name(categoryRequest.getName())
                .description(categoryRequest.getDescription())
                .build();
    }
}
