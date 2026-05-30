package com.tithu.ticketbook.common;

import java.time.Instant;

/**
 * Purpose: Standard error response wrapper for failed API requests.
 */
public record ErrorResponse(
        Instant timestamp,
        int status,
        String error,
        String message,
        String path
) {
}
