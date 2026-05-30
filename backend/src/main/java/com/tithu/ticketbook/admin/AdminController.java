package com.tithu.ticketbook.admin;

import com.tithu.ticketbook.booking.BookingResponse;
import com.tithu.ticketbook.booking.BookingService;
import com.tithu.ticketbook.show.ShowRequest;
import com.tithu.ticketbook.show.ShowResponse;
import com.tithu.ticketbook.show.ShowService;
import com.tithu.ticketbook.user.UserRepository;
import jakarta.validation.Valid;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * Purpose: Exposes admin-only endpoints for dashboard totals, shows, and bookings.
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ShowService showService;
    private final BookingService bookingService;
    private final UserRepository userRepository;

    public AdminController(
            ShowService showService,
            BookingService bookingService,
            UserRepository userRepository
    ) {
        this.showService = showService;
        this.bookingService = bookingService;
        this.userRepository = userRepository;
    }

    @GetMapping("/dashboard")
    public DashboardResponse getDashboard() {
        List<BookingResponse> bookings = bookingService.getAllBookings();
        BigDecimal revenue = bookings.stream()
                .filter(BookingResponse::paid)
                .map(BookingResponse::amount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new DashboardResponse(
                bookings.size(),
                revenue,
                userRepository.count(),
                showService.listActiveShows()
        );
    }

    @GetMapping("/shows")
    public List<ShowResponse> listShows() {
        return showService.listActiveShows();
    }

    @PostMapping("/shows")
    @ResponseStatus(HttpStatus.CREATED)
    public ShowResponse createShow(@Valid @RequestBody ShowRequest request) {
        return showService.createShow(request);
    }

    @GetMapping("/bookings")
    public List<BookingResponse> listBookings() {
        return bookingService.getAllBookings();
    }
}
