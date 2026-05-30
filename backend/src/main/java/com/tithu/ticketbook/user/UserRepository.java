package com.tithu.ticketbook.user;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Purpose: Handles database access for user records.
 */
public interface UserRepository extends JpaRepository<User, Long> {
}

