package com.eilco.e_commerce.controller.admin;


import com.eilco.e_commerce.dto.ProductRequest;
import com.eilco.e_commerce.model.Product;
import com.eilco.e_commerce.service.FileSystem;
import com.eilco.e_commerce.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/admin/api/products")

public class ProductControllerAdmin {
    @Autowired
    private ProductService productService;

    @Autowired
    private FileSystem fileSystem;

    @GetMapping("/all")
    public List<Product> index() {
        return productService.getAllProducts();
    }

    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(
            @ModelAttribute ProductRequest productRequest,
            @RequestParam(value = "image", required = false) MultipartFile image
            ) throws IOException {

        return ResponseEntity.ok(productService.saveProduct(productRequest, image));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable String id,
            @ModelAttribute ProductRequest productRequest,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "existingImage", required = false) String existingImage) throws IOException
    {
        return ResponseEntity.ok(productService.updateProduct(productRequest, image, existingImage, id));
    }

    @DeleteMapping("delete/{id}")
    public void deleteProduct(@PathVariable String id) {
        productService.deleteProduct(id);
    }

}
