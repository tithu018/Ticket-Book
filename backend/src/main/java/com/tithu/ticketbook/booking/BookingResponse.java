package com.tithu.ticketbook.booking;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tithu.ticketbook.show.ShowResponse;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * Purpose: Response body structure for sending booking data to the frontend.
 */
public record BookingResponse(
        @JsonProperty("_id")
        String id,

        UserSummary user,

        ShowResponse show,

        BigDecimal amount,

        List<String> bookedSeats,

        @JsonProperty("isPaid")
        boolean paid
) {

    public static BookingResponse from(Booking booking, Map<String, String> occupiedSeats) {
        return new BookingResponse(
                booking.getId().toString(),
                new UserSummary(booking.getUser().getName(), booking.getUser().getEmail()),
                ShowResponse.from(booking.getShow(), occupiedSeats),
                booking.getAmount(),
                booking.getSeats().stream().map(BookingSeat::getSeatNumber).toList(),
                booking.isPaid()
        );
    }

    public record UserSummary(String name, String email) {
    }
}
