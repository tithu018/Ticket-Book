package com.tithu.ticketbook.show;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Purpose: Handles database access for showtime records.
 */
public interface ShowRepository extends JpaRepository<Show, Long> {
}

