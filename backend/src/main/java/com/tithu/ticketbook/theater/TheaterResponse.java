package com.tithu.ticketbook.theater;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

/**
 * Purpose: Response body structure for sending theater and screen data to the frontend.
 */
public record TheaterResponse(
        @JsonProperty("_id")
        String id,
        String name,
        String city,
        String address,
        String imageUrl,
        List<ScreenResponse> screens
) {

    public static TheaterResponse from(Theater theater) {
        return new TheaterResponse(
                theater.getId().toString(),
                theater.getName(),
                theater.getCity(),
                theater.getAddress(),
                theater.getImageUrl(),
                theater.getScreens().stream().map(ScreenResponse::from).toList()
        );
    }

    public record ScreenResponse(
            @JsonProperty("_id")
            String id,
            String name,
            int seatRows,
            int seatsPerRow
    ) {

        public static ScreenResponse from(Screen screen) {
            return new ScreenResponse(
                    screen.getId().toString(),
                    screen.getName(),
                    screen.getSeatRows(),
                    screen.getSeatsPerRow()
            );
        }
    }
}
