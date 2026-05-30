package com.tithu.ticketbook.booking;

import com.tithu.ticketbook.user.User;
import com.tithu.ticketbook.user.UserService;
import jakarta.validation.Valid;
import java.security.Principal;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * Purpose: Exposes booking endpoints for creating bookings and viewing user bookings.
 */
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final UserService userService;

    public BookingController(BookingService bookingService, UserService userService) {
        this.bookingService = bookingService;
        this.userService = userService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public BookingResponse createBooking(@Valid @RequestBody BookingRequest request, Principal principal) {
        return bookingService.createBooking(currentUser(principal), request);
    }

    @GetMapping("/my")
    public List<BookingResponse> getMyBookings(Principal principal) {
        return bookingService.getMyBookings(currentUser(principal));
    }

    private User currentUser(Principal principal) {
        return userService.getByEmail(principal.getName());
    }
}
