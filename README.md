# Freelance Project - Microservices Setup

This project contains multiple services that work together:
- Frontend (Angular) - Freelancer registration and management
- Backend microservices (Spring Boot)
  - Employee Service - Manages freelancer profiles with skills and domains
  - Additional services for project management (Service A, Service B)

## Local Development Setup

### Prerequisites
- Java 17 JDK
- Node.js 18+ and npm
- Docker Desktop and Docker Compose

### 1. Start Local Development Environment

#### Backend Services (Spring Boot)
Each service can run independently during development:

```cmd
REM Start Service A (Terminal 1)
cd backend\services\service-a
mvn spring-boot:run

REM Start Service B (Terminal 2)
cd backend\services\service-b
mvn spring-boot:run
```

Services will be available at:
- Service A: http://localhost:8080
- Service B: http://localhost:8081

#### Frontend (Angular)
```cmd
REM Start Angular dev server
cd frontend
npm install
npm start
```

Frontend will be available at http://localhost:4200

### 2. Docker Compose Setup

For running all services together using Docker Compose:

```cmd
REM Build and start all services
docker-compose up --build

REM Start in detached mode
docker-compose up -d

REM View logs
docker-compose logs -f

REM Stop all services
docker-compose down
```

Services will be available at:
- Frontend: http://localhost:4200
- Service A: http://localhost:8080
- Service B: http://localhost:8081

## Service Communication

### Local Development
- Frontend -> Backend Services:
  - Direct HTTP calls to localhost ports (8080, 8081)
  - Configure Angular environment.ts with service URLs
  - CORS enabled in Spring Boot services for localhost

### Docker Compose Environment
- Service Discovery:
  - Services communicate using service names defined in docker-compose.yml
  - Example URL: http://service-a:8080
- Inter-service communication:
  - Using Docker Compose network
  - Service A -> Service B: http://service-b:8081
  - Frontend -> Backend: Direct HTTP calls

## Monitoring & Management

### Local Development
- Spring Boot Actuator endpoints (if enabled):
  - Health: http://localhost:8080/actuator/health
  - Metrics: http://localhost:8080/actuator/metrics
- Angular Dev Tools in browser

### Docker Environment
Monitor containers:
```cmd
REM View running containers
docker-compose ps

REM View logs for specific service
docker-compose logs -f service-a
docker-compose logs -f service-b
docker-compose logs -f frontend

REM Container shell access
docker-compose exec service-a sh
docker-compose exec service-b sh
```

## Troubleshooting

### Local Development
1. Service not starting:
   - Check port conflicts
   - Verify Java/Node versions
   - Check application.properties/environment.ts configs

### Docker Environment
1. Containers not starting:
   ```cmd
   REM Check container status
   docker-compose ps
   
   REM View service logs
   docker-compose logs -f service-a
   ```

2. Services not accessible:
   - Verify containers are running
   - Check port mappings in docker-compose.yml
   - Ensure services are on the same Docker network

3. Build issues:
   ```cmd
   REM Rebuild specific service
   docker-compose build service-a
   
   REM Force rebuild all services
   docker-compose build --no-cache
   ```

## Next Steps & Improvements

1. Add Development Tools:
   - Add hot-reload for Spring Boot services
   - Configure debugger attachments
   - Set up dev containers for VSCode

2. Add Monitoring:
   - Spring Boot Actuator metrics
   - Angular performance monitoring
   - Centralized logging (ELK stack)

3. CI/CD Pipeline:
   - GitHub Actions for builds
   - Automated testing
   - Container image publishing

4. Security:
   - Add API Gateway
   - Implement authentication
   - Set up SSL/TLS
