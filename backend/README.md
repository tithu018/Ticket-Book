# Tithu Backend

Purpose: Spring Boot backend structure for the ticket booking app.

This folder is only the backend skeleton. Each Java file contains a purpose comment so the real logic can be added step by step.

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

Suggested commit message:

```bash
git commit -m "chore: add Spring Boot backend skeleton"
```

