package com.eilco.e_commerce.config;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.eilco.e_commerce.dto.UserResponse;
import com.eilco.e_commerce.exceptions.AppException;
import com.eilco.e_commerce.model.User;
import com.eilco.e_commerce.repository.UserRepository;
import com.eilco.e_commerce.service.UserService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

@RequiredArgsConstructor
@Component
public class AuthProvider {

    @Value("${security.jwt.token.secret-key:secret-key}")
    private String key;

    private final UserRepository userRepository;

    @PostConstruct
    protected void init()
    {
        key = Base64.getEncoder().encodeToString(key.getBytes());
    }

    public String createToken(UserResponse userResponse)
    {
        Date now = new Date();
        Date expire = new Date(now.getTime() + 3_600_000);
        return JWT.create()

                .withIssuer(userResponse.getUser().getEmail())
                .withIssuedAt(now)
                .withExpiresAt(expire)
                .withClaim("name",userResponse.getUser().getName())
                .withClaim("id", userResponse.getUser().getId())
                .withClaim("role", userResponse.getUser().getRole().getName())
                .sign(Algorithm.HMAC256(key));
    }

//    public Authentication TokenMiddleware(String token)
//    {
//        Algorithm algorithm = Algorithm.HMAC256(key);
//
//        JWTVerifier verifier = JWT.require(algorithm).build();
//
//        DecodedJWT decodedJWT = verifier.verify(token);
//
//        String roleName = decodedJWT.getClaim("role").asString();
//        User user = User.builder()
//                .id(decodedJWT.getClaim("id").asString())
//                .email(decodedJWT.getIssuer())
//                .name(decodedJWT.getClaim("name").asString())
//                        .build();
//
//        UserResponse userResponse =  UserResponse.builder()
//                .user(user)
//                .build();
//        System.out.println("this token is for user : "+userResponse.getUser().getName()
//        +"\nwith id : "+userResponse.getUser().getId());
//
//
//        return new UsernamePasswordAuthenticationToken(userResponse.getUser(),null,
//                Collections.singletonList(new SimpleGrantedAuthority(roleName)));
//
//    }

    public Authentication validateTokenStrongly(String token) {
        Algorithm algorithm = Algorithm.HMAC256(key);

        JWTVerifier verifier = JWT.require(algorithm)
                .build();

        DecodedJWT decodedJWT = verifier.verify(token);


        Optional<User> user = userRepository.findById(decodedJWT.getClaim("id").asString());
        UserResponse userResponse =  UserResponse.builder()
                .user(user.get())
                .build();

        return new UsernamePasswordAuthenticationToken(userResponse, null,
                Collections.singletonList(new SimpleGrantedAuthority(userResponse.getUser().getRole().getName())));
    }
}
