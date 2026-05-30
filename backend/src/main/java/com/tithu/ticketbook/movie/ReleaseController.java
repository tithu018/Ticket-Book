package com.tithu.ticketbook.movie;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Purpose: Exposes release endpoints for the frontend releases page.
 */
@RestController
@RequestMapping("/api/releases")
public class ReleaseController {

    private final MovieService movieService;

    public ReleaseController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping
    public List<MovieResponse> listReleases() {
        return movieService.listReleases();
    }
}
