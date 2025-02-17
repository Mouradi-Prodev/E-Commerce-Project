package com.eilco.e_commerce.service;

import com.eilco.e_commerce.repository.OrderRepository;
import com.eilco.e_commerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatsService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    public double getTotalSales() {
        return orderRepository.findTotalSales();
    }

    public int getTotalOrders() {
        return orderRepository.findAll().size();
    }

    public int getTotalCustomers() {
        return userRepository.countByRoleName("ROLE_USER");
    }
}
