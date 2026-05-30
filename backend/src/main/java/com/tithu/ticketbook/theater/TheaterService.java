package com.tithu.ticketbook.theater;

import com.tithu.ticketbook.common.NotFoundException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Purpose: Holds theater and screen business logic.
 */
@Service
public class TheaterService {

    private final TheaterRepository theaterRepository;

    public TheaterService(TheaterRepository theaterRepository) {
        this.theaterRepository = theaterRepository;
    }

    @Transactional(readOnly = true)
    public List<TheaterResponse> listTheaters() {
        return theaterRepository.findAll().stream()
                .map(TheaterResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public TheaterResponse getTheater(Long id) {
        return TheaterResponse.from(theaterRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Theater not found")));
    }
}
