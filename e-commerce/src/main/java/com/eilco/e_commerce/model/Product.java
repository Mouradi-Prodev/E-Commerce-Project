package com.eilco.e_commerce.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Set;


@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@Builder
@Table(name = "products")
public class Product extends Model{

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", unique = true, nullable = false, updatable = false)
    private String id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(length = 500)
    private String description;


    private boolean active;

    private String imageUrl;

    @Column(nullable = false)
    private int quantity;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "category_id", nullable = true, foreignKey = @ForeignKey(ConstraintMode.CONSTRAINT))
    @JsonManagedReference
    private Category category;




}
