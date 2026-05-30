package com.tithu.ticketbook.show;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Purpose: Handles database access for showtime records.
 */
public interface ShowRepository extends JpaRepository<Show, Long> {

    List<Show> findByMovieIdAndActiveTrueOrderByShowDateTimeAsc(Long movieId);

    List<Show> findByActiveTrueOrderByShowDateTimeAsc();

    long countByActiveTrue();
}
