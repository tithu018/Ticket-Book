package com.tithu.ticketbook.booking;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Purpose: Handles database access for booking records.
 */
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserIdOrderByCreatedAtDesc(Long userId);

    List<Booking> findAllByOrderByCreatedAtDesc();
}
