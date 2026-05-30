package com.tithu.ticketbook.theater;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Purpose: Handles database access for theater records.
 */
public interface TheaterRepository extends JpaRepository<Theater, Long> {
}

