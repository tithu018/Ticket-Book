package com.tithu.ticketbook.payment;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;

/**
 * Purpose: Response body structure for sending payment status data to the frontend.
 */
public record PaymentResponse(
        @JsonProperty("_id")
        String id,
        String bookingId,
        BigDecimal amount,
        PaymentStatus status,
        String providerReference
) {

    public static PaymentResponse from(Payment payment) {
        return new PaymentResponse(
                payment.getId().toString(),
                payment.getBooking().getId().toString(),
                payment.getAmount(),
                payment.getStatus(),
                payment.getProviderReference()
        );
    }
}
