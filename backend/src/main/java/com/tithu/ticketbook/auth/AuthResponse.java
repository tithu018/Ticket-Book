package com.tithu.ticketbook.auth;

import com.tithu.ticketbook.user.User;
import com.tithu.ticketbook.user.UserRole;

/**
 * Purpose: Response body structure returned after login or signup.
 */
public record AuthResponse(String token, UserProfile user) {

    public static AuthResponse from(String token, User user) {
        return new AuthResponse(
                token,
                new UserProfile(user.getPublicId(), user.getName(), user.getEmail(), user.getRole())
        );
    }

    public record UserProfile(String id, String name, String email, UserRole role) {
    }
}
