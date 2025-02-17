package com.eilco.e_commerce.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User extends Model{
    @Id
    @Column(name = "id", unique = true, nullable = false, updatable = false)
    @GeneratedValue( strategy = GenerationType.UUID)
    private String id;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "email", nullable = false, unique = true)
    private String email;
    
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "phone_number", nullable = true)
    private String phone_number;

    @Column(name = "city", nullable = true)
    private String city;

    @Column(name = "local_address", nullable = true)
    private String local_address;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id", nullable = false)
    @JsonManagedReference
    private Role role;

}
