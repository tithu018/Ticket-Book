# Tithu Backend

Purpose: Spring Boot backend for the ticket booking app.

This backend includes JWT authentication, movie/show APIs, theater APIs, booking APIs, payment confirmation, admin dashboard APIs, and development seed data.

## Main Folders

```txt
src/main/java/com/tithu/ticketbook
  config/    Spring configuration such as CORS and security
  auth/      Login, signup, and JWT files
  user/      User account model and user data access
  movie/     Movie catalog API structure
  theater/   Theater and screen API structure
  show/      Show time API structure
  booking/   Seat booking API structure
  payment/   Payment API structure
  admin/     Admin dashboard API structure
  common/    Shared API response and error handling files
```

## Run

Windows recommended:

```powershell
.\run-backend.ps1
```

Direct Maven Wrapper command:

```bash
./mvnw spring-boot:run
```

Backend URL:

```txt
http://localhost:8081
```

## Deploy Environment

For Render plus a Postgres provider such as Neon, set these backend environment variables:

```txt
SPRING_DATASOURCE_URL=jdbc:postgresql://HOST/DB?sslmode=require
SPRING_DATASOURCE_USERNAME=your_database_user
SPRING_DATASOURCE_PASSWORD=your_database_password
SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver
SPRING_FLYWAY_ENABLED=true
SPRING_JPA_HIBERNATE_DDL_AUTO=validate
SPRING_H2_CONSOLE_ENABLED=false
APP_JWT_SECRET=use-a-long-random-secret-value
APP_CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
APP_SEED_ADMIN_EMAIL=your-admin-email@example.com
APP_SEED_ADMIN_PASSWORD=your-secure-admin-password
```

For Vercel, set this frontend environment variable:

```txt
VITE_API_BASE_URL=https://your-backend.onrender.com
```

H2 database console:

```txt
http://localhost:8081/h2-console
```

H2 JDBC URL:

```txt
jdbc:h2:file:./data/ticketbook
```

## Seed Users

```txt
Admin: admin@tithu.com / admin123
User:  user@tithu.com / user123
```

## Main APIs

```txt
POST /api/auth/signup
POST /api/auth/login

GET  /api/movies
GET  /api/movies/{id}
GET  /api/releases
GET  /api/theaters
GET  /api/shows
GET  /api/shows/movie/{movieId}
GET  /api/shows/{showId}/seats

POST /api/bookings
GET  /api/bookings/my
POST /api/payments

GET  /api/admin/dashboard
GET  /api/admin/shows
POST /api/admin/shows
GET  /api/admin/bookings
```

Suggested commit message:

```bash
git commit -m "chore: prepare app for free deployment"
```
