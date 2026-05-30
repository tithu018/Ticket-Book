package com.tithu.ticketbook.movie;

import com.tithu.ticketbook.common.BadRequestException;
import com.tithu.ticketbook.common.NotFoundException;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Purpose: Holds movie catalog business logic.
 */
@Service
public class MovieService {

    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @Transactional(readOnly = true)
    public List<MovieResponse> listMovies() {
        return movieRepository.findAll().stream()
                .map(MovieResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<MovieResponse> listReleases() {
        return movieRepository.findAllByOrderByReleaseDateDesc().stream()
                .map(MovieResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public MovieResponse getMovie(String publicId) {
        return MovieResponse.from(getMovieEntity(publicId));
    }

    @Transactional(readOnly = true)
    public Movie getMovieEntity(String publicId) {
        Long id = parseId(publicId);
        return movieRepository.findByExternalId(id)
                .or(() -> movieRepository.findById(id))
                .orElseThrow(() -> new NotFoundException("Movie not found"));
    }

    @Transactional
    public MovieResponse createMovie(MovieRequest request) {
        Long externalId = request.externalId();
        if (externalId != null && movieRepository.existsByExternalId(externalId)) {
            throw new BadRequestException("Movie external id already exists");
        }

        Movie movie = new Movie(
                externalId,
                request.title(),
                request.overview(),
                request.posterPath(),
                request.backdropPath(),
                LocalDate.parse(request.releaseDate()),
                request.originalLanguage() == null ? "en" : request.originalLanguage(),
                request.tagline(),
                request.voteAverage(),
                request.voteCount(),
                request.runtime(),
                request.genres() == null ? "" : String.join(",", request.genres()),
                request.casts() == null ? "" : request.casts().stream()
                        .map(cast -> cast.name() + "|" + cast.profilePath())
                        .reduce((first, second) -> first + ";;" + second)
                        .orElse("")
        );

        return MovieResponse.from(movieRepository.save(movie));
    }

    private Long parseId(String publicId) {
        try {
            return Long.parseLong(publicId);
        } catch (NumberFormatException exception) {
            throw new BadRequestException("Invalid movie id");
        }
    }
}
