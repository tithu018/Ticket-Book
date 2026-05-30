package com.tithu.ticketbook.show;

import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Purpose: Exposes showtime endpoints used by movie detail and seat booking pages.
 */
@RestController
@RequestMapping("/api/shows")
public class ShowController {

    private final ShowService showService;

    public ShowController(ShowService showService) {
        this.showService = showService;
    }

    @GetMapping
    public List<ShowResponse> listShows() {
        return showService.listActiveShows();
    }

    @GetMapping("/{showId}")
    public ShowResponse getShow(@PathVariable Long showId) {
        return showService.getShow(showId);
    }

    @GetMapping("/movie/{movieId}")
    public Map<String, List<ShowResponse.ShowTimeResponse>> getShowTimesForMovie(@PathVariable String movieId) {
        return showService.getShowTimesForMovie(movieId);
    }

    @GetMapping("/{showId}/seats")
    public Map<String, String> getOccupiedSeats(@PathVariable Long showId) {
        return showService.getOccupiedSeats(showId);
    }
}
