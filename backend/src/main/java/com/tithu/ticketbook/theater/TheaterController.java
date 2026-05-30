package com.tithu.ticketbook.theater;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Purpose: Exposes theater and screen endpoints for frontend theater pages.
 */
@RestController
@RequestMapping("/api/theaters")
public class TheaterController {

    private final TheaterService theaterService;

    public TheaterController(TheaterService theaterService) {
        this.theaterService = theaterService;
    }

    @GetMapping
    public List<TheaterResponse> listTheaters() {
        return theaterService.listTheaters();
    }

    @GetMapping("/{id}")
    public TheaterResponse getTheater(@PathVariable Long id) {
        return theaterService.getTheater(id);
    }
}
