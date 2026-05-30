package com.tithu.ticketbook.movie;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

/**
 * Purpose: Represents movie information shown in the frontend catalog.
 */
@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long externalId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 3000)
    private String overview;

    @Column(nullable = false, length = 1000)
    private String posterPath;

    @Column(nullable = false, length = 1000)
    private String backdropPath;

    @Column(nullable = false)
    private LocalDate releaseDate;

    @Column(nullable = false)
    private String originalLanguage;

    private String tagline;

    private Double voteAverage;

    private Integer voteCount;

    private Integer runtime;

    @Column(length = 1000)
    private String genresCsv;

    @Column(length = 6000)
    private String castsCsv;

    protected Movie() {
    }

    public Movie(
            Long externalId,
            String title,
            String overview,
            String posterPath,
            String backdropPath,
            LocalDate releaseDate,
            String originalLanguage,
            String tagline,
            Double voteAverage,
            Integer voteCount,
            Integer runtime,
            String genresCsv,
            String castsCsv
    ) {
        this.externalId = externalId;
        this.title = title;
        this.overview = overview;
        this.posterPath = posterPath;
        this.backdropPath = backdropPath;
        this.releaseDate = releaseDate;
        this.originalLanguage = originalLanguage;
        this.tagline = tagline;
        this.voteAverage = voteAverage;
        this.voteCount = voteCount;
        this.runtime = runtime;
        this.genresCsv = genresCsv;
        this.castsCsv = castsCsv;
    }

    public Long getId() {
        return id;
    }

    public Long getExternalId() {
        return externalId;
    }

    public void setExternalId(Long externalId) {
        this.externalId = externalId;
    }

    public String getPublicId() {
        return externalId != null ? externalId.toString() : id.toString();
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public String getBackdropPath() {
        return backdropPath;
    }

    public void setBackdropPath(String backdropPath) {
        this.backdropPath = backdropPath;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(LocalDate releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getOriginalLanguage() {
        return originalLanguage;
    }

    public void setOriginalLanguage(String originalLanguage) {
        this.originalLanguage = originalLanguage;
    }

    public String getTagline() {
        return tagline;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }

    public Double getVoteAverage() {
        return voteAverage;
    }

    public void setVoteAverage(Double voteAverage) {
        this.voteAverage = voteAverage;
    }

    public Integer getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(Integer voteCount) {
        this.voteCount = voteCount;
    }

    public Integer getRuntime() {
        return runtime;
    }

    public void setRuntime(Integer runtime) {
        this.runtime = runtime;
    }

    public String getGenresCsv() {
        return genresCsv;
    }

    public void setGenresCsv(String genresCsv) {
        this.genresCsv = genresCsv;
    }

    public String getCastsCsv() {
        return castsCsv;
    }

    public void setCastsCsv(String castsCsv) {
        this.castsCsv = castsCsv;
    }
}
