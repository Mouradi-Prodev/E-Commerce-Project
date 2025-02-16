package com.eilco.e_commerce;

import com.eilco.e_commerce.model.Role;
import com.eilco.e_commerce.model.User;
import com.eilco.e_commerce.repository.RoleRepository;
import com.eilco.e_commerce.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@Component
public class DataLoader implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    public DataLoader(RoleRepository roleRepository,
                      UserRepository userRepository,
                      PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Ensure the "USER" role exists
        ensureRoleExists("ROLE_USER");
        // Ensure the "ADMIN" role exists
        ensureRoleExists("ROLE_ADMIN");

        // Ensure admin user exists
        String name = "Mouradi Salah eddine";
        String adminEmail = "sallah.mouradi19@gmail.com";
        String adminPassword = "12345678";
        ensureAdminUserExists(name,adminEmail, adminPassword);
    }

    private void ensureRoleExists(String roleName) {
        if (!roleRepository.existsByName(roleName)) {
            Role role = new Role();
            role.setName(roleName);
            roleRepository.save(role);
        }
    }

    private void ensureAdminUserExists(String nameParam, String adminEmailParam, String adminPasswordParam) {
        String name = nameParam;
        String adminEmail = adminEmailParam;
        String adminPassword = adminPasswordParam;

        if (!userRepository.existsByEmail(adminEmail)) {
            User admin = new User();
            admin.setName(name);
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));

            Role adminRole = roleRepository.findByName("ROLE_ADMIN")
                    .orElseThrow(() -> new RuntimeException("ADMIN role not found"));

            admin.setRole(adminRole);
            userRepository.save(admin);
        }
    }
}
