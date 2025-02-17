package com.eilco.e_commerce.repository;

import com.eilco.e_commerce.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, String> {
    @Query("SELECT SUM(o.totalPrice) FROM Order o")
    double findTotalSales();
}
