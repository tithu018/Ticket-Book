package com.tithu.ticketbook.payment;

import jakarta.validation.constraints.NotNull;

/**
 * Purpose: Request body structure for confirming payment for a booking.
 */
public record PaymentRequest(
        @NotNull
        Long bookingId
) {
}
