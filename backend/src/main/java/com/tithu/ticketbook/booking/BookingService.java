package com.tithu.ticketbook.booking;

import com.tithu.ticketbook.common.BadRequestException;
import com.tithu.ticketbook.common.NotFoundException;
import com.tithu.ticketbook.show.Show;
import com.tithu.ticketbook.show.ShowService;
import com.tithu.ticketbook.user.User;
import com.tithu.ticketbook.user.UserRole;
import java.math.BigDecimal;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Purpose: Holds seat locking, booking creation, and booking lookup business logic.
 */
@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final BookingSeatRepository bookingSeatRepository;
    private final ShowService showService;

    public BookingService(
            BookingRepository bookingRepository,
            BookingSeatRepository bookingSeatRepository,
            ShowService showService
    ) {
        this.bookingRepository = bookingRepository;
        this.bookingSeatRepository = bookingSeatRepository;
        this.showService = showService;
    }

    @Transactional
    public BookingResponse createBooking(User user, BookingRequest request) {
        Show show = showService.getShowEntity(request.showId());
        if (!show.isActive()) {
            throw new BadRequestException("Show is not active");
        }

        Set<String> normalizedSeats = normalizeSeats(request.seats());
        for (String seat : normalizedSeats) {
            if (bookingSeatRepository.existsByBookingShowIdAndSeatNumber(show.getId(), seat)) {
                throw new BadRequestException("Seat " + seat + " is already booked");
            }
        }

        BigDecimal amount = show.getShowPrice().multiply(BigDecimal.valueOf(normalizedSeats.size()));
        Booking booking = new Booking(user, show, amount);
        normalizedSeats.forEach(booking::addSeat);

        Booking savedBooking = bookingRepository.save(booking);
        return BookingResponse.from(savedBooking, showService.getOccupiedSeats(show.getId()));
    }

    @Transactional(readOnly = true)
    public List<BookingResponse> getMyBookings(User user) {
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(user.getId()).stream()
                .map(booking -> BookingResponse.from(booking, showService.getOccupiedSeats(booking.getShow().getId())))
                .toList();
    }

    @Transactional(readOnly = true)
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(booking -> BookingResponse.from(booking, showService.getOccupiedSeats(booking.getShow().getId())))
                .toList();
    }

    @Transactional(readOnly = true)
    public Booking getBookingForPayment(Long bookingId, User user) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new NotFoundException("Booking not found"));
        if (!booking.getUser().getId().equals(user.getId()) && user.getRole() != UserRole.ADMIN) {
            throw new BadRequestException("Booking does not belong to this user");
        }
        return booking;
    }

    @Transactional
    public Booking save(Booking booking) {
        return bookingRepository.save(booking);
    }

    private Set<String> normalizeSeats(List<String> seats) {
        if (seats.size() > 5) {
            throw new BadRequestException("You can book maximum 5 seats at once");
        }

        Set<String> normalizedSeats = new LinkedHashSet<>();
        for (String seat : seats) {
            String normalized = seat == null ? "" : seat.trim().toUpperCase();
            if (!normalized.matches("[A-J][1-9]")) {
                throw new BadRequestException("Invalid seat number: " + seat);
            }
            normalizedSeats.add(normalized);
        }

        if (normalizedSeats.isEmpty()) {
            throw new BadRequestException("Select at least one seat");
        }

        return normalizedSeats;
    }
}
