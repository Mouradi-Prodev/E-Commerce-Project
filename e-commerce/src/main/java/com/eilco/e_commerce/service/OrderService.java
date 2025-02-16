package com.eilco.e_commerce.service;

import com.eilco.e_commerce.exceptions.AppException;
import com.eilco.e_commerce.model.Order;
import com.eilco.e_commerce.repository.OrderRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Data
@Builder
@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    public Order save(Order order)
    {
        return orderRepository.save(order);
    }

    public Order getOrder(String id)
    {
        return orderRepository.findById(id).orElseThrow(
                ()-> new AppException("Order not found", HttpStatus.BAD_REQUEST)
        );
    }
}
