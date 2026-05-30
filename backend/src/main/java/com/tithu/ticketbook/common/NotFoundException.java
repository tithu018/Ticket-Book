package com.tithu.ticketbook.common;

/**
 * Purpose: Exception used when a requested resource does not exist.
 */
public class NotFoundException extends RuntimeException {

    public NotFoundException(String message) {
        super(message);
    }
}
