package com.eilco.e_commerce.repository;

import com.eilco.e_commerce.model.Category;
import com.eilco.e_commerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    List<Product> findByCategory(Category category);


    @Query("SELECT p FROM Product p WHERE p.active = true")
    List<Product> findActiveProducts();
    @Query(value = "SELECT * FROM Products p ORDER BY p.created_at DESC LIMIT :limit", nativeQuery = true)
    List<Product> findLatestProducts(@Param("limit") int limit);
}
