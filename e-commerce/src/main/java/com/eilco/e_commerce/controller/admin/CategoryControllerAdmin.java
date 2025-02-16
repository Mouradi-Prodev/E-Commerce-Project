package com.eilco.e_commerce.controller.admin;


import com.eilco.e_commerce.dto.CategoryRequest;
import com.eilco.e_commerce.dto.CategoryResponse;
import com.eilco.e_commerce.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/api/categories")
public class CategoryControllerAdmin {
    @Autowired
    private CategoryService categoryService;


    @PostMapping("/create")
    public CategoryResponse store(@ModelAttribute CategoryRequest categoryRequest)
    {
        return CategoryResponse.builder()
                .category(categoryService.saveCategory(categoryRequest))
                .build();
    }

    @PutMapping("/update/{id}")
    public  CategoryResponse update(@ModelAttribute CategoryRequest categoryRequest, @PathVariable String id)
    {
        return CategoryResponse.builder()
                .category(categoryService.updateCategory(categoryRequest, id))
                .build();
    }
    @DeleteMapping("delete/{id}")
    public void deleteProduct(@PathVariable String id) {
        categoryService.deleteCategory(id);
    }
}
