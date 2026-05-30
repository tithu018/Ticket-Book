package com.tithu.ticketbook.show;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.time.Instant;

/**
 * Purpose: Request body structure for creating or updating showtimes.
 */
public record ShowRequest(
        @NotNull
        Long movieId,

        @NotNull
        Long screenId,

        @NotNull
        Instant showDateTime,

        @NotNull
        @Positive
        BigDecimal showPrice
) {
}
