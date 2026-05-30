package com.tithu.ticketbook.movie;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Arrays;
import java.util.List;

/**
 * Purpose: Response body structure for sending movie data to the frontend.
 */
public record MovieResponse(
        @JsonProperty("_id")
        String id,

        @JsonProperty("id")
        Long externalId,

        String title,

        String overview,

        @JsonProperty("poster_path")
        String posterPath,

        @JsonProperty("backdrop_path")
        String backdropPath,

        List<GenreResponse> genres,

        List<CastResponse> casts,

        @JsonProperty("release_date")
        String releaseDate,

        @JsonProperty("original_language")
        String originalLanguage,

        String tagline,

        @JsonProperty("vote_average")
        double voteAverage,

        @JsonProperty("vote_count")
        int voteCount,

        int runtime
) {

    public static MovieResponse from(Movie movie) {
        return new MovieResponse(
                movie.getPublicId(),
                movie.getExternalId(),
                movie.getTitle(),
                movie.getOverview(),
                movie.getPosterPath(),
                movie.getBackdropPath(),
                parseGenres(movie.getGenresCsv()),
                parseCasts(movie.getCastsCsv()),
                movie.getReleaseDate().toString(),
                movie.getOriginalLanguage(),
                movie.getTagline(),
                movie.getVoteAverage() == null ? 0 : movie.getVoteAverage(),
                movie.getVoteCount() == null ? 0 : movie.getVoteCount(),
                movie.getRuntime() == null ? 0 : movie.getRuntime()
        );
    }

    private static List<GenreResponse> parseGenres(String genresCsv) {
        if (genresCsv == null || genresCsv.isBlank()) {
            return List.of();
        }

        return Arrays.stream(genresCsv.split(","))
                .map(String::trim)
                .filter(genre -> !genre.isBlank())
                .map(genre -> new GenreResponse(Math.abs(genre.hashCode()), genre))
                .toList();
    }

    private static List<CastResponse> parseCasts(String castsCsv) {
        if (castsCsv == null || castsCsv.isBlank()) {
            return List.of();
        }

        return Arrays.stream(castsCsv.split(";;"))
                .map(String::trim)
                .filter(cast -> !cast.isBlank())
                .map(cast -> {
                    String[] parts = cast.split("\\|", 2);
                    return new CastResponse(parts[0], parts.length > 1 ? parts[1] : "");
                })
                .toList();
    }

    public record GenreResponse(long id, String name) {
    }

    public record CastResponse(String name, @JsonProperty("profile_path") String profilePath) {
    }
}
