package com.eilco.e_commerce.service;

import com.eilco.e_commerce.dto.ProductRequest;
import com.eilco.e_commerce.dto.ProductResponse;
import com.eilco.e_commerce.model.Category;
import com.eilco.e_commerce.model.Product;
import com.eilco.e_commerce.repository.CategoryRepository;
import com.eilco.e_commerce.repository.ProductRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;



@AllArgsConstructor
@Data
@Builder
@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryService categoryService;

    private FileSystem fileSystem;

    public List<Product> getAllProducts() {
       return productRepository.findAll();
    }

    public List<Product> activeProducts()
    {
        return productRepository.findActiveProducts();
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);

    }

    public Product saveProduct(ProductRequest productRequest, MultipartFile image)throws IOException {
        String imageUrl = (image != null && !image.isEmpty()) ? fileSystem.storeFile(image) : null;
        return  productRepository.save(convertProductRequestToProduct(productRequest, imageUrl, null));

    }

    public Product updateProduct(ProductRequest productRequest, MultipartFile image, String existingImageUrl, String id) throws IOException
    {
        String imageUrl = null;
        if(existingImageUrl != null){
            imageUrl = existingImageUrl;
        }else if(image != null && !image.isEmpty()){
            imageUrl = fileSystem.storeFile(image);
        }
        return productRepository.save(convertProductRequestToProduct(productRequest, imageUrl,id));
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }

    public List<Product> getLatestProducts(int limit) {
        return productRepository.findLatestProducts(limit);
    }

    public Product convertProductRequestToProduct(ProductRequest productRequest, String imageUrl, String id) throws IOException
    {

        return   Product.builder()
                .id(id)
                .name(productRequest.getName())
                .price(productRequest.getPrice())
                .active(productRequest.isActive())
                .quantity(productRequest.getQuantity())
                .description(productRequest.getDescription())
                .category(categoryService.getCategoryById(productRequest.getCategory()))
                .imageUrl(imageUrl)
                .build();
    }
}
