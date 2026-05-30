package com.tithu.ticketbook.movie;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Purpose: Handles database access for movie records.
 */
public interface MovieRepository extends JpaRepository<Movie, Long> {
}

