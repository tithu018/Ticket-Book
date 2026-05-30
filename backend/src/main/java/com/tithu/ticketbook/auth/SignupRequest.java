package com.tithu.ticketbook.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Purpose: Request body structure for new user registration details.
 */
public record SignupRequest(
        @NotBlank
        String name,

        @Email
        @NotBlank
        String email,

        @Size(min = 6)
        String password
) {
}
