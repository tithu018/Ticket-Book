package com.tithu.ticketbook.booking;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Purpose: Handles database access for individual booked seat records.
 */
public interface BookingSeatRepository extends JpaRepository<BookingSeat, Long> {

    boolean existsByBookingShowIdAndSeatNumber(Long showId, String seatNumber);

    @Query("""
            select seat.seatNumber, booking.user.id
            from BookingSeat seat
            join seat.booking booking
            where booking.show.id = :showId
            """)
    List<Object[]> findOccupiedSeatRows(@Param("showId") Long showId);
}
