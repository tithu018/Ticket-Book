package com.tithu.ticketbook.user;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Purpose: Handles database access for user records.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailIgnoreCase(String email);

    boolean existsByEmailIgnoreCase(String email);

    long countByRole(UserRole role);
}
