package com.eilco.e_commerce.repository;

import com.eilco.e_commerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    @Query("SELECT COUNT(u) FROM User u WHERE u.role.name = :roleName")
    int countByRoleName(@Param("roleName") String roleName);


}
