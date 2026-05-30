package com.tithu.ticketbook.show;

import com.tithu.ticketbook.movie.Movie;
import com.tithu.ticketbook.theater.Screen;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.time.Instant;

/**
 * Purpose: Represents a movie showtime with date, time, screen, and ticket price.
 */
@Entity
@Table(name = "shows")
public class Show {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "movie_id", nullable = false)
    private Movie movie;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "screen_id", nullable = false)
    private Screen screen;

    @Column(nullable = false)
    private Instant showDateTime;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal showPrice;

    @Column(nullable = false)
    private boolean active = true;

    protected Show() {
    }

    public Show(Movie movie, Screen screen, Instant showDateTime, BigDecimal showPrice) {
        this.movie = movie;
        this.screen = screen;
        this.showDateTime = showDateTime;
        this.showPrice = showPrice;
    }

    public Long getId() {
        return id;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Screen getScreen() {
        return screen;
    }

    public void setScreen(Screen screen) {
        this.screen = screen;
    }

    public Instant getShowDateTime() {
        return showDateTime;
    }

    public void setShowDateTime(Instant showDateTime) {
        this.showDateTime = showDateTime;
    }

    public BigDecimal getShowPrice() {
        return showPrice;
    }

    public void setShowPrice(BigDecimal showPrice) {
        this.showPrice = showPrice;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
