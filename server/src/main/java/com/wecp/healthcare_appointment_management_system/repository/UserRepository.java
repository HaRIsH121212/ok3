package com.wecp.healthcare_appointment_management_system.repository;

import com.wecp.healthcare_appointment_management_system.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    User findByUsername(String username);

    // public boolean existsByByEmail(String email);
    public boolean existsByUsername(String username);
}



