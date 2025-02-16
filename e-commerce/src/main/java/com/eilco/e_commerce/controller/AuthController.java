package com.eilco.e_commerce.controller;

import com.eilco.e_commerce.config.AuthProvider;
import com.eilco.e_commerce.dto.ShippingInfoRequest;
import com.eilco.e_commerce.dto.UserRequest;
import com.eilco.e_commerce.dto.UserResponse;
import com.eilco.e_commerce.dto.UserSignUpRequest;
import com.eilco.e_commerce.model.User;
import com.eilco.e_commerce.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;


@RestController

@RequestMapping("/api")
public class AuthController {


    @Autowired
    private  UserService userService;
    @Autowired
    private  AuthProvider authProvider;

    @GetMapping("/user")
    public ResponseEntity<UserResponse> user()
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserResponse user = (UserResponse) authentication.getPrincipal();
        user.setToken("already defined when login and signup");
        return ResponseEntity.ok(user);
    }
    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody UserRequest userRequest)
    {
        UserResponse user = userService.login(userRequest);
        String token = authProvider.createToken(user);
        user.setToken(token);

        return ResponseEntity.ok(user);
    }
    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody UserSignUpRequest userSignUpRequest)
    {
        UserResponse user = userService.register(userSignUpRequest);
        user.setToken(authProvider.createToken(user));
        return ResponseEntity.created(URI.create("/users/"+ user.getUser().getId())).body(user);
    }

    @PutMapping("/user/shipping/update")
    public ResponseEntity<?> updateShippingInfo(@RequestBody ShippingInfoRequest shippingInfoRequest)
    {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserResponse user = (UserResponse) authentication.getPrincipal();
        user.getUser().setLocal_address(shippingInfoRequest.getLocal_address());
        user.getUser().setCity(shippingInfoRequest.getCity());
        user.getUser().setPhone_number(shippingInfoRequest.getPhone_number());


        userService.save(user.getUser());

        return ResponseEntity.ok(user.getUser());
    }

}