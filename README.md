# Freelance Management Platform - Microservices Architecture

**Built with Amazon Q Developer** - Demonstrating enterprise-grade microservices development using AI assistance

## Project Overview

A comprehensive freelance management platform showcasing modern microservices architecture, built entirely with Amazon Q Developer AI assistance. This project demonstrates how AI can accelerate enterprise application development while maintaining best practices.

### Architecture
- **Frontend**: Angular 20 SPA with PrimeNG + TailwindCSS
- **Backend**: Spring Boot 3.x microservices
- **Database**: MySQL 8.0 with JPA/Hibernate
- **Orchestration**: Kubernetes + Docker + Minikube
- **Services**: Employee Management, Skills Tracking, Domain Expertise

### AI Development Highlights
- **90% code generated** using Amazon Q Developer prompts
- **Enterprise patterns** implemented through AI guidance
- **Best practices** embedded from AI recommendations
- **Comprehensive documentation** created with AI assistance

## Technology Stack

### Frontend
- Angular 20 with TypeScript
- PrimeNG UI components
- TailwindCSS for styling
- nginx for production serving

### Backend
- Spring Boot 3.x
- JPA/Hibernate for database operations
- MySQL 8.0 database
- Maven for dependency management

### DevOps
- Docker for containerization
- Kubernetes for orchestration
- Minikube for local development
- Docker Compose for local testing

## Quick Start

### Prerequisites
- Java 17 JDK
- Node.js 18+ and npm
- Docker Desktop
- Minikube (optional)

### Local Development with Docker Compose
```bash
# Clone the repository
git clone https://github.com/DilipRavikumar/freelance-project.git
cd freelance-project

# Start all services
docker-compose up --build

# Access the application
# Frontend: http://localhost:4200
# Backend API: http://localhost:8080/api/employees
# MySQL: localhost:3306
```

### Kubernetes Deployment
```bash
# Deploy to Kubernetes
kubectl apply -f k8s/

# Check deployment status
kubectl get pods
kubectl get services

# Access via port forwarding
kubectl port-forward service/frontend 4200:4200
kubectl port-forward service/employee-service 8080:8080
```

### Minikube Deployment
```bash
# Start Minikube
minikube start

# Set Docker environment
minikube docker-env --shell cmd
# Run the SET commands shown

# Build images in Minikube
docker build -t frontend:latest frontend/
docker build -t employee-service:latest backend/employee-service/

# Deploy to Minikube
kubectl apply -f k8s/

# Access services
minikube service frontend --url
minikube service employee-service --url
```

## Project Structure

```
freelance/
├── frontend/                       # Angular 20 SPA
│   ├── src/app/
│   │   ├── features/              # Feature modules
│   │   ├── core/                  # Core services
│   │   └── shared/                # Shared components
│   ├── Dockerfile                 # Multi-stage build
│   └── nginx.conf                 # SPA routing config
├── backend/
│   └── employee-service/          # Spring Boot microservice
│       ├── src/main/java/         # Java source code
│       ├── Dockerfile             # Container config
│       └── pom.xml                # Maven dependencies
├── k8s/                           # Kubernetes manifests
│   ├── frontend-deployment.yaml
│   ├── employee-deployment.yaml
│   └── mysql-deployment.yaml
├── docs/                          # Documentation
│   ├── kubernetes-networking.md
│   ├── minikube-deployment-guide.md
│   └── COMPLETE-BEGINNER-GUIDE.md
└── docker-compose.yml             # Local development
```

## API Endpoints

### Employee Management
- `GET /api/employees` - List all employees
- `POST /api/employees` - Create new employee
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee
- `GET /api/employees/{id}/skills` - Get employee skills

### Health Checks
- `GET /actuator/health` - Backend health status
- `GET /actuator/metrics` - Application metrics

## Documentation

### Core Documentation
- **[Complete Beginner's Guide](COMPLETE-BEGINNER-GUIDE.md)** - Comprehensive tutorial for beginners
- **[Project Overview](docs/project-overview.md)** - Detailed architecture and features
- **[Kubernetes Networking](docs/kubernetes-networking.md)** - Networking architecture guide
- **[Minikube Deployment](docs/minikube-deployment-guide.md)** - Minikube setup and deployment

### Amazon Q Developer Prompts
The documentation includes comprehensive AI prompts used to build this project:
- Backend microservice development
- Frontend Angular application
- Docker containerization
- Kubernetes deployment
- DevOps automation

## Development Workflow

### Frontend Development
```bash
cd frontend
npm install
npm start                          # Development server
npm run build                      # Production build
npm test                          # Run tests
```

### Backend Development
```bash
cd backend/employee-service
mvn clean install                  # Build project
mvn spring-boot:run               # Run locally
mvn test                          # Run tests
```

### Container Development
```bash
# Build images
docker build -t frontend:latest frontend/
docker build -t employee-service:latest backend/employee-service/

# Run with Docker Compose
docker-compose up --build

# Deploy to Kubernetes
kubectl apply -f k8s/
kubectl rollout restart deployment frontend
```

## Features

### Current Implementation
- Employee/freelancer profile management
- Skills and domain expertise tracking
- Responsive web interface with PrimeNG
- RESTful API endpoints
- Container orchestration with Kubernetes
- Database persistence with MySQL

### AI-Generated Components
- Complete CRUD operations with validation
- Angular services with HTTP client
- Docker multi-stage builds
- Kubernetes manifests with best practices
- nginx configuration for SPA routing

## Troubleshooting

### Common Issues
- **Port conflicts**: Check `docker ps` and `kubectl get svc`
- **Database connection**: Verify MySQL service status
- **Image pull errors**: Use `imagePullPolicy: Never` for local images
- **Angular routing**: Ensure nginx.conf has `try_files` configuration

### Debug Commands
```bash
# Check application status
kubectl get pods
kubectl logs -f deployment/frontend
curl http://localhost:8080/actuator/health

# Docker troubleshooting
docker ps
docker logs <container-name>
docker-compose logs -f
```

## Deployment Options

### Local Development
- **Docker Compose**: Fastest for development
- **Individual services**: Best for debugging
- **Minikube**: Production-like environment

### Production Deployment
- **Kubernetes cluster**: Scalable production deployment
- **Container registry**: Push images to registry
- **CI/CD pipeline**: Automated deployment

## Learning Resources

### For Beginners
- Complete step-by-step guide included
- All commands explained with "what" and "why"
- Troubleshooting section for common issues
- Links to official documentation

### Advanced Topics
- Microservices architecture patterns
- Kubernetes networking and service mesh
- CI/CD pipeline implementation
- Monitoring and observability

## Contributing

### Development Guidelines
1. Use Amazon Q Developer for rapid prototyping
2. Follow microservices design patterns
3. Implement comprehensive testing
4. Document API changes
5. Update Kubernetes manifests

### Code Standards
- **Spring Boot**: Follow Spring conventions
- **Angular**: Use Angular style guide
- **Docker**: Multi-stage builds for optimization
- **Kubernetes**: Resource limits and health checks

## Next Steps

### Immediate Improvements
1. **API Gateway**: Centralized routing and authentication
2. **JWT Authentication**: Secure user management
3. **Monitoring**: Prometheus + Grafana dashboards
4. **CI/CD**: GitHub Actions pipeline

### Advanced Features
1. **Service Mesh**: Istio for advanced networking
2. **Event Streaming**: Kafka for async communication
3. **Caching**: Redis for performance optimization
4. **Analytics**: Business intelligence dashboards

---

**Built with Amazon Q Developer - Accelerating enterprise development through AI assistance**