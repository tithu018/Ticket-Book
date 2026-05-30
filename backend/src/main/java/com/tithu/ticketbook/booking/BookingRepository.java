package com.tithu.ticketbook.booking;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Purpose: Handles database access for booking records.
 */
public interface BookingRepository extends JpaRepository<Booking, Long> {
}

