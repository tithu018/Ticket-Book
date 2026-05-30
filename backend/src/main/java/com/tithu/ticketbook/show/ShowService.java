package com.tithu.ticketbook.show;

import com.tithu.ticketbook.booking.BookingSeatRepository;
import com.tithu.ticketbook.common.NotFoundException;
import com.tithu.ticketbook.movie.Movie;
import com.tithu.ticketbook.movie.MovieService;
import com.tithu.ticketbook.theater.Screen;
import com.tithu.ticketbook.theater.ScreenRepository;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Purpose: Holds showtime scheduling and availability business logic.
 */
@Service
public class ShowService {

    private final ShowRepository showRepository;
    private final MovieService movieService;
    private final ScreenRepository screenRepository;
    private final BookingSeatRepository bookingSeatRepository;

    public ShowService(
            ShowRepository showRepository,
            MovieService movieService,
            ScreenRepository screenRepository,
            BookingSeatRepository bookingSeatRepository
    ) {
        this.showRepository = showRepository;
        this.movieService = movieService;
        this.screenRepository = screenRepository;
        this.bookingSeatRepository = bookingSeatRepository;
    }

    @Transactional(readOnly = true)
    public List<ShowResponse> listActiveShows() {
        return showRepository.findByActiveTrueOrderByShowDateTimeAsc().stream()
                .map(show -> ShowResponse.from(show, getOccupiedSeats(show.getId())))
                .toList();
    }

    @Transactional(readOnly = true)
    public Map<String, List<ShowResponse.ShowTimeResponse>> getShowTimesForMovie(String movieId) {
        Movie movie = movieService.getMovieEntity(movieId);
        DateTimeFormatter dateFormatter = DateTimeFormatter.ISO_LOCAL_DATE.withZone(ZoneOffset.UTC);

        return showRepository.findByMovieIdAndActiveTrueOrderByShowDateTimeAsc(movie.getId()).stream()
                .collect(Collectors.groupingBy(
                        show -> dateFormatter.format(show.getShowDateTime()),
                        LinkedHashMap::new,
                        Collectors.mapping(show -> new ShowResponse.ShowTimeResponse(
                                show.getShowDateTime(),
                                show.getId().toString()
                        ), Collectors.toList())
                ));
    }

    @Transactional(readOnly = true)
    public Show getShowEntity(Long showId) {
        return showRepository.findById(showId)
                .orElseThrow(() -> new NotFoundException("Show not found"));
    }

    @Transactional(readOnly = true)
    public ShowResponse getShow(Long showId) {
        Show show = getShowEntity(showId);
        return ShowResponse.from(show, getOccupiedSeats(showId));
    }

    @Transactional(readOnly = true)
    public Map<String, String> getOccupiedSeats(Long showId) {
        getShowEntity(showId);

        Map<String, String> occupiedSeats = new LinkedHashMap<>();
        for (Object[] row : bookingSeatRepository.findOccupiedSeatRows(showId)) {
            occupiedSeats.put((String) row[0], "user_" + row[1]);
        }
        return occupiedSeats;
    }

    @Transactional
    public ShowResponse createShow(ShowRequest request) {
        Movie movie = movieService.getMovieEntity(request.movieId().toString());
        Screen screen = screenRepository.findById(request.screenId())
                .orElseThrow(() -> new NotFoundException("Screen not found"));

        Show show = new Show(movie, screen, request.showDateTime(), request.showPrice());
        Show savedShow = showRepository.save(show);
        return ShowResponse.from(savedShow, Map.of());
    }
}
