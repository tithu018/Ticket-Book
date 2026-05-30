package com.tithu.ticketbook.payment;

import com.tithu.ticketbook.booking.Booking;
import com.tithu.ticketbook.booking.BookingService;
import com.tithu.ticketbook.user.User;
import java.util.UUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Purpose: Holds payment creation, status update, and gateway integration logic.
 */
@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final BookingService bookingService;

    public PaymentService(PaymentRepository paymentRepository, BookingService bookingService) {
        this.paymentRepository = paymentRepository;
        this.bookingService = bookingService;
    }

    @Transactional
    public PaymentResponse confirmPayment(User user, PaymentRequest request) {
        Booking booking = bookingService.getBookingForPayment(request.bookingId(), user);
        booking.setPaid(true);
        bookingService.save(booking);

        Payment payment = paymentRepository.findByBookingId(booking.getId())
                .orElseGet(() -> new Payment(
                        booking,
                        booking.getAmount(),
                        PaymentStatus.PAID,
                        "local_" + UUID.randomUUID()
                ));
        payment.setStatus(PaymentStatus.PAID);

        return PaymentResponse.from(paymentRepository.save(payment));
    }
}
