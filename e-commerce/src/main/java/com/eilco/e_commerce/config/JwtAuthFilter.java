package com.eilco.e_commerce.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {


    private final AuthProvider userAuthProvider;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException{

        String path = request.getRequestURI();
        if (path.startsWith("/api/login") || path.startsWith("/api/register")) {
            filterChain.doFilter(request, response);
           return;
        }
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(header != null)
        {
            String[] authElements = header.split(" ");
            if(authElements.length == 2 && "Bearer".equals(authElements[0]))
            {
                try{
//                    if ("GET".equals(request.getMethod())) {
//                        SecurityContextHolder.getContext().setAuthentication(
//                                userAuthProvider.TokenMiddleware(authElements[1]));
//                    } else {
//
//                    }
                    SecurityContextHolder.getContext().setAuthentication(
                            userAuthProvider.validateTokenStrongly(authElements[1]));
                }catch (RuntimeException e)
                {
                    SecurityContextHolder.clearContext();
                    throw e;
                }

            }
        }
        filterChain.doFilter(request, response);
    }



}
