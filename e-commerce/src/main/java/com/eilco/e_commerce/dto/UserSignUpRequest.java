package com.eilco.e_commerce.dto;


import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserSignUpRequest {
    private String name;
    private String email;
    private String password;
    private String phone_number;
    private String city;
    private String local_address;
}
