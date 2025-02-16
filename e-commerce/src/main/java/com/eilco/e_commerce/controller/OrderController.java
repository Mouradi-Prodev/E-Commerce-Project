package com.eilco.e_commerce.controller;

import com.eilco.e_commerce.dto.OrderProductRequest;
import com.eilco.e_commerce.dto.OrderRequest;
import com.eilco.e_commerce.dto.UserResponse;
import com.eilco.e_commerce.exceptions.AppException;
import com.eilco.e_commerce.model.Order;
import com.eilco.e_commerce.model.OrderProduct;
import com.eilco.e_commerce.model.Product;
import com.eilco.e_commerce.model.User;
import com.eilco.e_commerce.service.OrderService;
import com.eilco.e_commerce.service.ProductService;
import com.eilco.e_commerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @PostMapping("/order/confirm")
    public ResponseEntity<?> confirmOrder(@RequestBody OrderRequest orderRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        UserResponse userResponse = (UserResponse) authentication.getPrincipal();
        User user = userResponse.getUser();



        Order order = Order.builder()
                .user(user)
                .build();
        Order savedOrder = orderService.save(order);

        Set<OrderProduct> orderProducts = new HashSet<>();
        for (OrderProductRequest orderProductRequest : orderRequest.getOrderProducts()) {
            Product product = productService.getProductById(orderProductRequest.getProductId())
                    .orElseThrow(() -> new AppException("Product not found", HttpStatus.BAD_REQUEST));

            OrderProduct orderProduct = OrderProduct.builder()
                    .product(product)
                    .order(savedOrder)
                    .quantity(orderProductRequest.getQuantity())
                    .build();
            orderProducts.add(orderProduct);
        }


        savedOrder.setOrderProducts(orderProducts);
        orderService.save(savedOrder);

        return ResponseEntity.ok(Map.of("orderId", order.getId()));
    }

    @GetMapping("/order/{id}")
    public ResponseEntity<Order> getOneOrder(@PathVariable String id)
    {
        return ResponseEntity.ok(orderService.getOrder(id));
    }
}
