package com.tithu.ticketbook.theater;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Purpose: Handles database access for screen records.
 */
public interface ScreenRepository extends JpaRepository<Screen, Long> {
}

