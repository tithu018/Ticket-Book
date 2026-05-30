package com.tithu.ticketbook.show;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tithu.ticketbook.movie.MovieResponse;
import java.math.BigDecimal;
import java.time.Instant;
import java.util.Map;

/**
 * Purpose: Response body structure for sending showtime data to the frontend.
 */
public record ShowResponse(
        @JsonProperty("_id")
        String id,

        MovieResponse movie,

        Instant showDateTime,

        BigDecimal showPrice,

        Map<String, String> occupiedSeats
) {

    public static ShowResponse from(Show show, Map<String, String> occupiedSeats) {
        return new ShowResponse(
                show.getId().toString(),
                MovieResponse.from(show.getMovie()),
                show.getShowDateTime(),
                show.getShowPrice(),
                occupiedSeats
        );
    }

    public record ShowTimeResponse(Instant time, String showId) {
    }
}
