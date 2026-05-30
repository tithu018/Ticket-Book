package com.tithu.ticketbook.movie;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.util.List;

/**
 * Purpose: Request body structure for creating or updating movie data.
 */
public record MovieRequest(
        @JsonProperty("id")
        Long externalId,

        @NotBlank
        String title,

        @NotBlank
        String overview,

        @JsonProperty("poster_path")
        @NotBlank
        String posterPath,

        @JsonProperty("backdrop_path")
        @NotBlank
        String backdropPath,

        @JsonProperty("release_date")
        @NotBlank
        String releaseDate,

        @JsonProperty("original_language")
        String originalLanguage,

        String tagline,

        @JsonProperty("vote_average")
        Double voteAverage,

        @JsonProperty("vote_count")
        Integer voteCount,

        @NotNull
        @Positive
        Integer runtime,

        List<String> genres,

        List<CastRequest> casts
) {

    public record CastRequest(String name, @JsonProperty("profile_path") String profilePath) {
    }
}
