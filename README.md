# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Suggested React Native + Go + PostgreSQL Structure (no code)

Below is a **proposed** project layout for a React Native (frontend) + Go (backend) + PostgreSQL stack. Each file includes a short comment explaining why it exists.

```
ticket-book/
├─ frontend/                          # Mobile app (React Native) workspace
│  ├─ app/                             # App entry surfaces and navigation
│  │  ├─ App.tsx                       # Root component to bootstrap navigation/providers
│  │  ├─ routes.ts                     # Central route definitions for screens
│  │  └─ navigation.tsx                # Navigation container setup (stack/tab)
│  ├─ assets/                          # Static images, fonts, icons
│  │  ├─ fonts/                        # Custom fonts used across UI
│  │  └─ images/                       # Brand images and illustrations
│  ├─ components/                      # Reusable UI components
│  │  ├─ Button.tsx                    # Shared button styles/behavior
│  │  └─ TextField.tsx                 # Shared input component with validation states
│  ├─ features/                        # Feature-first slices (auth, tickets, devices, etc.)
│  │  ├─ auth/                         # Login/register UI + state
│  │  │  ├─ screens/                   # Auth screens (Login, Register, Forgot)
│  │  │  ├─ api.ts                     # Auth API calls wrapper
│  │  │  └─ state.ts                   # Auth state management (context/store)
│  │  └─ devices/                      # Device onboarding & monitoring
│  │     ├─ screens/                   # Device list/detail/config screens
│  │     ├─ api.ts                     # Device API calls wrapper
│  │     └─ state.ts                   # Device state management
│  ├─ hooks/                           # Shared React hooks
│  │  └─ useApi.ts                     # Generic API calling hook
│  ├─ services/                        # App-wide services
│  │  ├─ apiClient.ts                  # HTTP client setup (base URL, interceptors)
│  │  ├─ storage.ts                    # Async storage wrapper
│  │  └─ analytics.ts                  # Analytics event helpers
│  ├─ theme/                           # Design system tokens
│  │  ├─ colors.ts                     # Color palette source of truth
│  │  ├─ spacing.ts                    # Spacing scale for layout
│  │  └─ typography.ts                 # Font sizes and weights
│  ├─ utils/                           # Pure helpers and formatting
│  │  └─ formatters.ts                 # Date/number/string helpers
│  ├─ .env.example                     # Sample env vars for mobile build
│  ├─ app.json                         # React Native/Expo app metadata
│  ├─ package.json                     # Frontend dependencies and scripts
│  └─ tsconfig.json                    # TypeScript config for RN app
├─ backend/                            # API server (Go)
│  ├─ cmd/                             # App entrypoints (main packages)
│  │  └─ server/                       # API server entry
│  │     └─ main.go                    # Bootstraps config, db, routes, server
│  ├─ internal/                        # Private app code (not exported)
│  │  ├─ config/                       # Config parsing + env loading
│  │  │  └─ config.go                  # Central config struct + loader
│  │  ├─ db/                           # Database setup and migrations
│  │  │  ├─ migrations/                # SQL migration files (schema changes)
│  │  │  └─ postgres.go                # DB connection + pool management
│  │  ├─ handlers/                     # HTTP handlers (controllers)
│  │  │  ├─ auth.go                    # Auth endpoints (login, register)
│  │  │  └─ devices.go                 # Device endpoints (list, configure)
│  │  ├─ middleware/                   # HTTP middleware (auth, logging)
│  │  │  └─ auth.go                    # JWT/session validation
│  │  ├─ models/                       # Domain models and DB mappings
│  │  │  ├─ user.go                    # User entity definition
│  │  │  └─ device.go                  # Device entity definition
│  │  ├─ repository/                   # Data access layer
│  │  │  ├─ user_repo.go               # User CRUD in PostgreSQL
│  │  │  └─ device_repo.go             # Device CRUD in PostgreSQL
│  │  ├─ services/                     # Business logic layer
│  │  │  ├─ auth_service.go            # Auth rules (hashing, tokens)
│  │  │  └─ device_service.go          # Device logic (provisioning, status)
│  │  └─ router/                       # HTTP router setup
│  │     └─ router.go                  # Route registration + middleware wiring
│  ├─ pkg/                             # Reusable libraries (optional)
│  │  └─ logger/                       # Shared logging helpers
│  │     └─ logger.go                  # Logger configuration wrapper
│  ├─ api/                             # OpenAPI/Swagger specs
│  │  └─ openapi.yaml                  # API contract for frontend/clients
│  ├─ .env.example                     # Sample backend env vars (DB URL, secrets)
│  ├─ go.mod                           # Go module definition
│  └─ go.sum                           # Dependency checksums
├─ infra/                              # Infrastructure & deployment resources
│  ├─ docker/                          # Dockerfiles and compose files
│  │  ├─ backend.Dockerfile            # Container build for Go API
│  │  └─ docker-compose.yml            # Local dev stack (API + Postgres)
│  ├─ k8s/                             # Kubernetes manifests (optional)
│  │  ├─ backend-deployment.yaml       # Deploy API in Kubernetes
│  │  └─ postgres-statefulset.yaml     # Deploy PostgreSQL in Kubernetes
│  └─ scripts/                         # Devops helper scripts
│     └─ init_db.sh                    # Database initialization helper
├─ docs/                               # Documentation
│  ├─ architecture.md                  # High-level system architecture
│  ├─ api.md                           # API usage notes and examples
│  └─ onboarding.md                    # Dev setup instructions
├─ .gitignore                          # Ignore build artifacts and secrets
└─ README.md                           # Project overview and setup guide
```
