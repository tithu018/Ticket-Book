package com.tithu.ticketbook.movie;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Purpose: Handles database access for movie records.
 */
public interface MovieRepository extends JpaRepository<Movie, Long> {

    Optional<Movie> findByExternalId(Long externalId);

    boolean existsByExternalId(Long externalId);

    List<Movie> findAllByOrderByReleaseDateDesc();
}
