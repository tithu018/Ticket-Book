package com.tithu.ticketbook.booking;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;

/**
 * Purpose: Request body structure for creating a ticket booking.
 */
public record BookingRequest(
        @NotNull
        Long showId,

        @NotEmpty
        List<String> seats
) {
}
