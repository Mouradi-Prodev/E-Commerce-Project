package com.eilco.e_commerce.service;


import com.eilco.e_commerce.dto.UserRequest;
import com.eilco.e_commerce.dto.UserResponse;
import com.eilco.e_commerce.dto.UserSignUpRequest;
import com.eilco.e_commerce.exceptions.AppException;
import com.eilco.e_commerce.model.Role;
import com.eilco.e_commerce.model.User;
import com.eilco.e_commerce.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.Optional;

@Service

public class UserService {
    @Autowired
    private RoleService roleService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserResponse login(UserRequest userRequest)
    {

        Optional<User> user  = userRepository.findByEmail(userRequest.getEmail());
        if(user.isEmpty())
        {
            throw new AppException("the User doesn't exist", HttpStatus.BAD_REQUEST);
        }

        if (passwordEncoder.matches(CharBuffer.wrap(userRequest.getPassword()), user.get().getPassword()))
        {

            return UserResponse.builder()
                    .user(user.get())
                    .build();
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);

    }

    public UserResponse register(UserSignUpRequest userSignUpRequest)
    {
        Optional<User> oUser = userRepository.findByEmail(userSignUpRequest.getEmail());
        if(oUser.isPresent())
        {
            throw new AppException("the email address already taken", HttpStatus.BAD_REQUEST);
        }

      // Ensure the Role USER exists
        Role defaultRole = roleService.ensureRoleExists("ROLE_USER");

        User user = User.builder().email(userSignUpRequest.getEmail())
                .name(userSignUpRequest.getName())
                .city(userSignUpRequest.getCity())
                .local_address(userSignUpRequest.getLocal_address())
                .phone_number(userSignUpRequest.getPhone_number())
                .role(defaultRole)
                .password(passwordEncoder.encode(CharBuffer.wrap(userSignUpRequest.getPassword())))
                .build();
        userRepository.save(user);
        return UserResponse.builder()
                .user(user)

                .build();

    }

    public void save(User user) {
        userRepository.save(user);
    }



}
