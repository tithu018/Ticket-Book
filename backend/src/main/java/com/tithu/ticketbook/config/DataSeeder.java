package com.tithu.ticketbook.config;

import com.tithu.ticketbook.booking.Booking;
import com.tithu.ticketbook.booking.BookingRepository;
import com.tithu.ticketbook.movie.Movie;
import com.tithu.ticketbook.movie.MovieRepository;
import com.tithu.ticketbook.payment.Payment;
import com.tithu.ticketbook.payment.PaymentRepository;
import com.tithu.ticketbook.payment.PaymentStatus;
import com.tithu.ticketbook.show.Show;
import com.tithu.ticketbook.show.ShowRepository;
import com.tithu.ticketbook.theater.Screen;
import com.tithu.ticketbook.theater.ScreenRepository;
import com.tithu.ticketbook.theater.Theater;
import com.tithu.ticketbook.theater.TheaterRepository;
import com.tithu.ticketbook.user.User;
import com.tithu.ticketbook.user.UserRepository;
import com.tithu.ticketbook.user.UserRole;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.transaction.annotation.Transactional;

/**
 * Purpose: Inserts development data so the backend is usable immediately after startup.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private static final String CASTS = String.join(";;",
            "Milla Jovovich|https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg",
            "Dave Bautista|https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg",
            "Arly Jover|https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg",
            "Amara Okereke|https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg",
            "Fraser James|https://image.tmdb.org/t/p/original/mGAPQG2OKTgdKFkp9YpvCSqcbgY.jpg",
            "Deirdre Mullins|https://image.tmdb.org/t/p/original/lJm89neuiVlYISEqNpGZA5kTAnP.jpg",
            "Sebastian Stankiewicz|https://image.tmdb.org/t/p/original/hLN0Ca09KwQOFLZLPIEzgTIbqqg.jpg",
            "Tue Lunding|https://image.tmdb.org/t/p/original/qY4W0zfGBYzlCyCC0QDJS1Muoa0.jpg",
            "Jacek Dzisiewicz|https://image.tmdb.org/t/p/original/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg",
            "Ian Hanmore|https://image.tmdb.org/t/p/original/yhI4MK5atavKBD9wiJtaO1say1p.jpg",
            "Eveline Hall|https://image.tmdb.org/t/p/original/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg",
            "Simon Loof|https://image.tmdb.org/t/p/original/cbZrB8crWlLEDjVUoak8Liak6s.jpg"
    );

    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final TheaterRepository theaterRepository;
    private final ScreenRepository screenRepository;
    private final ShowRepository showRepository;
    private final BookingRepository bookingRepository;
    private final PaymentRepository paymentRepository;
    private final PasswordEncoder passwordEncoder;
    private final boolean seedDemoUsers;
    private final String seedAdminEmail;
    private final String seedAdminPassword;
    private final String seedAdminName;
    private final String seedUserEmail;
    private final String seedUserPassword;
    private final String seedUserName;

    public DataSeeder(
            UserRepository userRepository,
            MovieRepository movieRepository,
            TheaterRepository theaterRepository,
            ScreenRepository screenRepository,
            ShowRepository showRepository,
            BookingRepository bookingRepository,
            PaymentRepository paymentRepository,
            PasswordEncoder passwordEncoder,
            @Value("${app.seed.demo-users:false}") boolean seedDemoUsers,
            @Value("${app.seed.admin.email:}") String seedAdminEmail,
            @Value("${app.seed.admin.password:}") String seedAdminPassword,
            @Value("${app.seed.admin.name:Tithu Admin}") String seedAdminName,
            @Value("${app.seed.user.email:user@tithu.com}") String seedUserEmail,
            @Value("${app.seed.user.password:user123}") String seedUserPassword,
            @Value("${app.seed.user.name:Demo User}") String seedUserName
    ) {
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
        this.theaterRepository = theaterRepository;
        this.screenRepository = screenRepository;
        this.showRepository = showRepository;
        this.bookingRepository = bookingRepository;
        this.paymentRepository = paymentRepository;
        this.passwordEncoder = passwordEncoder;
        this.seedDemoUsers = seedDemoUsers;
        this.seedAdminEmail = seedAdminEmail;
        this.seedAdminPassword = seedAdminPassword;
        this.seedAdminName = seedAdminName;
        this.seedUserEmail = seedUserEmail;
        this.seedUserPassword = seedUserPassword;
        this.seedUserName = seedUserName;
    }

    @Override
    @Transactional
    public void run(String... args) {
        seedUsers();
        seedMovies();
        seedTheaters();
        seedShows();
        seedBookings();
    }

    private void seedUsers() {
        if (StringUtils.hasText(seedAdminEmail)
                && StringUtils.hasText(seedAdminPassword)
                && !userRepository.existsByEmailIgnoreCase(seedAdminEmail)) {
            userRepository.save(new User(
                    seedAdminName,
                    seedAdminEmail.trim().toLowerCase(),
                    passwordEncoder.encode(seedAdminPassword),
                    UserRole.ADMIN
            ));
        }

        if (seedDemoUsers && !userRepository.existsByEmailIgnoreCase(seedUserEmail)) {
            userRepository.save(new User(
                    seedUserName,
                    seedUserEmail.trim().toLowerCase(),
                    passwordEncoder.encode(seedUserPassword),
                    UserRole.USER
            ));
        }
    }

    private void seedMovies() {
        if (movieRepository.count() > 0) {
            return;
        }

        movieRepository.saveAll(List.of(
                movie(
                        324544L,
                        "In the Lost Lands",
                        "A queen sends the powerful and feared sorceress Gray Alys to the ghostly wilderness of the Lost Lands in search of a magical power, where she and her guide must outwit and outfight both man and demon.",
                        "https://image.tmdb.org/t/p/original/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg",
                        "https://image.tmdb.org/t/p/original/op3qmNhvwEvyT7UFyPbIfQmKriB.jpg",
                        "2025-02-27",
                        "She seeks the power to free her people.",
                        6.4,
                        15000,
                        102,
                        "Action,Fantasy,Adventure"
                ),
                movie(
                        1232546L,
                        "Until Dawn",
                        "One year after her sister mysteriously disappeared, Clover and her friends head into the remote valley where she vanished in search of answers.",
                        "https://image.tmdb.org/t/p/original/juA4IWO52Fecx8lhAsxmDgy3M3.jpg",
                        "https://image.tmdb.org/t/p/original/icFWIk1KfkWLZnugZAJEDauNZ94.jpg",
                        "2025-04-23",
                        "Every night a different nightmare.",
                        6.405,
                        18000,
                        103,
                        "Horror,Mystery"
                ),
                movie(
                        552524L,
                        "Lilo & Stitch",
                        "The wildly funny and touching story of a lonely Hawaiian girl and the fugitive alien who helps to mend her broken family.",
                        "https://image.tmdb.org/t/p/original/mKKqV23MQ0uakJS8OCE2TfV5jNS.jpg",
                        "https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg",
                        "2025-05-17",
                        "Hold on to your coconuts.",
                        7.117,
                        27500,
                        108,
                        "Family,Comedy,Science Fiction"
                ),
                movie(
                        668489L,
                        "Havoc",
                        "When a drug heist swerves lethally out of control, a jaded cop fights through a corrupt city's criminal underworld to save a politician's son.",
                        "https://image.tmdb.org/t/p/original/ubP2OsF3GlfqYPvXyLw9d78djGX.jpg",
                        "https://image.tmdb.org/t/p/original/65MVgDa6YjSdqzh7YOA04mYkioo.jpg",
                        "2025-04-25",
                        "No law. Only disorder.",
                        6.537,
                        35960,
                        107,
                        "Action,Crime,Thriller"
                ),
                movie(
                        950387L,
                        "A Minecraft Movie",
                        "Four misfits are pulled through a mysterious portal into the Overworld, a cubic wonderland that thrives on imagination.",
                        "https://image.tmdb.org/t/p/original/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg",
                        "https://image.tmdb.org/t/p/original/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg",
                        "2025-03-31",
                        "Be there and be square.",
                        6.516,
                        15225,
                        101,
                        "Family,Comedy,Adventure,Fantasy"
                ),
                movie(
                        575265L,
                        "Mission: Impossible - The Final Reckoning",
                        "Ethan Hunt and team continue their search for the terrifying AI known as the Entity, racing to prevent the world from changing forever.",
                        "https://image.tmdb.org/t/p/original/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg",
                        "https://image.tmdb.org/t/p/original/1p5aI299YBnqrEEvVGJERk2MXXb.jpg",
                        "2025-05-17",
                        "Our lives are the sum of our choices.",
                        7.042,
                        19885,
                        170,
                        "Action,Adventure,Thriller"
                ),
                movie(
                        986056L,
                        "Thunderbolts*",
                        "Seven disillusioned castoffs must embark on a dangerous mission that forces them to confront the darkest corners of their pasts.",
                        "https://image.tmdb.org/t/p/original/m9EtP1Yrzv6v7dMaC9mRaGhd1um.jpg",
                        "https://image.tmdb.org/t/p/original/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg",
                        "2025-04-30",
                        "Everyone deserves a second shot.",
                        7.443,
                        23569,
                        127,
                        "Action,Science Fiction,Adventure"
                )
        ));
    }

    private void seedTheaters() {
        if (theaterRepository.count() > 0) {
            return;
        }

        Theater central = new Theater(
                "Tithu Central Cinema",
                "Colombo",
                "Level 4, City Center, Colombo",
                "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80"
        );
        central.addScreen(new Screen("Screen 1", 10, 9));
        central.addScreen(new Screen("Screen 2", 10, 9));

        Theater skyline = new Theater(
                "Skyline Multiplex",
                "Kandy",
                "No 18, Lake Road, Kandy",
                "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80"
        );
        skyline.addScreen(new Screen("Main Hall", 10, 9));

        theaterRepository.saveAll(List.of(central, skyline));
    }

    private void seedShows() {
        if (showRepository.count() > 0) {
            return;
        }

        Screen screen = screenRepository.findAll().stream()
                .findFirst()
                .orElseThrow();

        Movie lostLands = movieRepository.findByExternalId(324544L).orElseThrow();
        Movie untilDawn = movieRepository.findByExternalId(1232546L).orElseThrow();
        Movie lilo = movieRepository.findByExternalId(552524L).orElseThrow();
        Movie mission = movieRepository.findByExternalId(575265L).orElseThrow();

        showRepository.saveAll(List.of(
                new Show(lostLands, screen, Instant.parse("2026-06-30T02:30:00Z"), BigDecimal.valueOf(59)),
                new Show(lostLands, screen, Instant.parse("2026-06-30T15:30:00Z"), BigDecimal.valueOf(59)),
                new Show(untilDawn, screen, Instant.parse("2026-07-01T15:30:00Z"), BigDecimal.valueOf(81)),
                new Show(lilo, screen, Instant.parse("2026-07-02T03:30:00Z"), BigDecimal.valueOf(81)),
                new Show(mission, screen, Instant.parse("2026-07-03T16:00:00Z"), BigDecimal.valueOf(79))
        ));
    }

    private void seedBookings() {
        if (bookingRepository.count() > 0) {
            return;
        }

        if (!seedDemoUsers) {
            return;
        }

        User user = userRepository.findByEmailIgnoreCase(seedUserEmail).orElseThrow();
        Show show = showRepository.findByActiveTrueOrderByShowDateTimeAsc().get(0);

        Booking pendingBooking = new Booking(user, show, show.getShowPrice().multiply(BigDecimal.valueOf(2)));
        pendingBooking.addSeat("D1");
        pendingBooking.addSeat("D2");

        Booking paidBooking = new Booking(user, show, show.getShowPrice());
        paidBooking.addSeat("A1");
        paidBooking.setPaid(true);

        bookingRepository.save(pendingBooking);
        Booking savedPaidBooking = bookingRepository.save(paidBooking);
        paymentRepository.save(new Payment(
                savedPaidBooking,
                savedPaidBooking.getAmount(),
                PaymentStatus.PAID,
                "seed_payment_001"
        ));
    }

    private Movie movie(
            Long externalId,
            String title,
            String overview,
            String posterPath,
            String backdropPath,
            String releaseDate,
            String tagline,
            double voteAverage,
            int voteCount,
            int runtime,
            String genres
    ) {
        return new Movie(
                externalId,
                title,
                overview,
                posterPath,
                backdropPath,
                LocalDate.parse(releaseDate),
                "en",
                tagline,
                voteAverage,
                voteCount,
                runtime,
                genres,
                CASTS
        );
    }
}
