# Freelance Management Platform - Microservices Architecture

## Project Overview

A full-stack microservices application for freelance management built with Spring Boot, Angular, and Kubernetes. This project demonstrates enterprise-grade development practices using modern technologies and AI-assisted development with Amazon Q Developer.

## Architecture

```
Frontend (Angular 20) → Backend (Spring Boot) → Database (MySQL)
        ↓                      ↓                    ↓
    nginx:80              spring-boot:8080      mysql:3306
        ↓                      ↓                    ↓
   Kubernetes Pod        Kubernetes Pod      Kubernetes Pod
```

## Technology Stack

- **Frontend**: Angular 20, PrimeNG, TailwindCSS, nginx
- **Backend**: Spring Boot 3.x, JPA/Hibernate, Maven
- **Database**: MySQL 8.0
- **Containerization**: Docker, Docker Compose
- **Orchestration**: Kubernetes (Docker Desktop)

## Project Structure

```
freelance/
├── backend/employee-service/     # Spring Boot microservice
├── frontend/                     # Angular SPA
├── k8s/                         # Kubernetes manifests
├── docs/                        # Documentation
└── docker-compose.yml           # Local development
```

## Features

- Employee/freelancer profile management
- Skills and domain expertise tracking
- Responsive web interface
- RESTful API endpoints
- Container orchestration
- Database persistence with relationships

## Quick Start

### Prerequisites
- Java 17 JDK
- Node.js 18+
- Docker Desktop with Kubernetes

### Local Development
```bash
# Start all services
docker-compose up --build

# Access points
# Frontend: http://localhost:4200
# API: http://localhost:8080/api/employees
```

### Kubernetes Deployment
```bash
# Deploy to cluster
kubectl apply -f k8s/

# Verify deployment
kubectl get all
```

## API Endpoints

- `GET /api/employees` - List all employees
- `POST /api/employees` - Create employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee
- `GET /api/employees/{id}/skills` - Get employee skills

## Database Schema

### Employee Entity
- id (Primary Key)
- name, email, phone
- experience level
- created/updated timestamps

### Skills Entity
- id (Primary Key)
- skill name, category
- Many-to-many relationship with Employee

## Amazon Q Developer Prompts Used

### Backend Development
```
"Create a Spring Boot 3.x microservice for employee management with:
- JPA entities for Employee and Skills with many-to-many relationship
- REST controllers with CRUD operations
- MySQL database configuration
- Docker support with Dockerfile
- Include proper validation and error handling"
```

### Frontend Development
```
"Create an Angular 20 application for employee management with:
- PrimeNG components for UI (DataTable, Forms, Cards)
- TailwindCSS for styling
- HTTP services for API communication
- Routing with lazy loading
- Responsive design for mobile and desktop"
```

### DevOps Configuration
```
"Create Kubernetes deployment manifests for a full-stack application:
- Angular frontend with nginx serving
- Spring Boot backend service
- MySQL database with persistent storage
- Service discovery and load balancing
- Include Docker Compose for local development"
```

### nginx SPA Configuration
```
"Configure nginx for Angular Single Page Application:
- Handle client-side routing with try_files
- Serve static assets with caching
- Production-ready configuration for containerized deployment"
```

## Key Implementation Details

### Spring Boot Configuration
- JPA entities with proper relationships
- REST controllers with HTTP status codes
- MySQL connection with connection pooling
- Docker multi-stage build optimization

### Angular Architecture
- Feature-based module structure
- Reactive forms with validation
- HTTP interceptors for error handling
- PrimeNG components for consistent UI

### Kubernetes Networking
- LoadBalancer service for external access
- ClusterIP services for internal communication
- Service discovery using DNS names
- Pod-to-pod communication within cluster

### Docker Optimization
- Multi-stage builds for smaller images
- nginx serving for production Angular builds
- Health checks and proper signal handling
- Non-root user for security

## Troubleshooting

### Common Issues
- **Port conflicts**: Check `docker ps` and `kubectl get svc`
- **Database connection**: Verify MySQL service status
- **Angular routing**: Ensure nginx.conf has try_files configuration
- **Image pull**: Use `imagePullPolicy: Never` for local images

### Debug Commands
```bash
# Check pod status
kubectl get pods
kubectl logs -f deployment/frontend

# Test services
kubectl exec deployment/frontend -- wget -qO- http://localhost:80
curl http://localhost:8080/actuator/health
```

## Development Workflow

1. **Local Development**: Use Docker Compose for rapid iteration
2. **Testing**: Deploy to Kubernetes for production-like testing
3. **Monitoring**: Check logs and health endpoints
4. **Scaling**: Adjust replica counts in Kubernetes manifests

