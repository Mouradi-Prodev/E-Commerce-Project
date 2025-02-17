package com.eilco.e_commerce.controller.admin;


import com.eilco.e_commerce.service.StatsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/admin/api/stats")
public class StatsController {


    @Autowired
    private StatsService statsService;

    @GetMapping("/total-sales")
    public ResponseEntity<?> totalSales() {
        double totalSales = statsService.getTotalSales();
        return ResponseEntity.ok(totalSales);

    }

    @GetMapping("/total-orders")
    public ResponseEntity<?> totalOrders() {
        int totalOrders = statsService.getTotalOrders();
        return ResponseEntity.ok(totalOrders);
    }

    @GetMapping("/total-customers")
    public ResponseEntity<?> totalCustomers() {
        int totalCustomers = statsService.getTotalCustomers();
        return ResponseEntity.ok(totalCustomers);
    }
}
