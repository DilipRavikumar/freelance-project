# Frontend Documentation

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.8. The application follows a modular architecture with feature-based organization and implements best practices for scalable Angular applications.

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── core/                 # Core functionality used throughout the app
│   │   │   ├── guards/           # Route guards for authentication and authorization
│   │   │   ├── interceptors/     # HTTP interceptors for auth and error handling
│   │   │   ├── models/          # Data models and DTOs
│   │   │   ├── pipes/           # Global pipes
│   │   │   └── services/        # Core services (API, Auth, Storage)
│   │   │
│   │   ├── features/            # Feature modules
│   │   │   ├── admin/          # Admin feature module
│   │   │   ├── auth/           # Authentication feature (login/register)
│   │   │   └── landing/        # Landing page feature
│   │   │
│   │   ├── layout/             # Layout components
│   │   │   ├── admin-layout/   # Admin dashboard layout
│   │   │   ├── auth-layout/    # Authentication pages layout
│   │   │   └── main-layout/    # Main application layout
│   │   │
│   │   └── shared/             # Shared components and utilities
│   │
│   ├── environments/           # Environment configurations
│   ├── index.html             # Main HTML file
│   ├── main.ts                # Application entry point
│   └── styles.css             # Global styles
│
├── angular.json               # Angular workspace configuration
├── package.json              # Project dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## Core Module (`/core`)

### Guards
- `auth.guard.ts`: Protects routes requiring authentication
- `guest.guard.ts`: Restricts authenticated users from guest-only routes
- `role.guard.ts`: Controls route access based on user roles

### Interceptors
- `auth.interceptor.ts`: Adds authentication headers to requests
- `error.interceptor.ts`: Global error handling for HTTP requests

### Services
- `api.service.ts`: Base service for HTTP communications
- `auth.service.ts`: Handles authentication and user session
- `storage.service.ts`: Manages local storage operations

## Feature Modules (`/features`)

### Authentication Module
- Login and Registration components
- Protected route configuration
- Authentication state management

### Admin Module
- Administrative dashboard and features
- Role-based access control
- Admin-specific components

### Landing Module
- Public landing page
- Marketing content
- Call-to-action components

## Layouts (`/layout`)

The application uses three main layouts:
1. **Main Layout**: Default layout for authenticated users
2. **Auth Layout**: Specialized layout for login/register pages
3. **Admin Layout**: Dashboard layout for administrative sections

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Build Commands

### Development Build
```bash
ng build
```

### Production Build
```bash
ng build --configuration production
```

Build artifacts will be stored in the `dist/` directory.

## Testing

### Unit Tests
```bash
ng test
```
Uses [Karma](https://karma-runner.github.io) as the test runner.

### End-to-End Tests
```bash
ng e2e
```
Note: Choose an E2E testing framework based on your project needs.

## Code Style and Best Practices

- Follows Angular style guide recommendations
- Implements lazy loading for feature modules
- Uses TypeScript strict mode for type safety
- Implements responsive design with Tailwind CSS
- Follows SOLID principles and component-based architecture

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
