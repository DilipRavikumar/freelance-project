# Freelance Project - Microservices Setup

This project contains multiple services that work together:
- Frontend (Angular)
- Backend microservices (Spring Boot)
  - Service A
  - Service B

## Local Development Setup

### Prerequisites
- Java 17 JDK
- Node.js 18+ and npm
- Docker Desktop
- Kubernetes cluster (choose one):
  - Minikube: `minikube start --driver=docker`
  - Kind: `kind create cluster --name freelance`
  - Docker Desktop's built-in Kubernetes: Enable in Docker Desktop settings
- kubectl CLI

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

### 2. Local Docker Build

Build all services:

```cmd
REM Backend Service A
cd backend\services\service-a
mvn clean package -DskipTests
docker build -t freelance/service-a:dev .

REM Backend Service B
cd ..\service-b
mvn clean package -DskipTests
docker build -t freelance/service-b:dev .

REM Frontend
cd ..\..\frontend
docker build -t freelance/frontend:dev .
```

### 3. Local Kubernetes Deployment

#### 3.1 Load Images into Local Cluster

If using Minikube:
```cmd
minikube image load freelance/service-a:dev
minikube image load freelance/service-b:dev
minikube image load freelance/frontend:dev
```

If using Kind:
```cmd
kind load docker-image freelance/service-a:dev --name freelance
kind load docker-image freelance/service-b:dev --name freelance
kind load docker-image freelance/frontend:dev --name freelance
```

#### 3.2 Deploy Services

```cmd
REM Create namespace
kubectl apply -f backend/k8s/namespace.yaml

REM Deploy backend services
kubectl apply -f backend/services/service-a/k8s/ -n freelance-backend
kubectl apply -f backend/services/service-b/k8s/ -n freelance-backend

REM Deploy frontend
kubectl apply -f frontend/k8s/ -n freelance-backend
```

#### 3.3 Verify Deployment

```cmd
kubectl get pods,svc -n freelance-backend
```

#### 3.4 Access Services Locally

Quick testing with port-forward:
```cmd
REM Forward backend services
kubectl port-forward svc/service-a 8080:80 -n freelance-backend
kubectl port-forward svc/service-b 8081:80 -n freelance-backend

REM Forward frontend
kubectl port-forward svc/frontend 4200:80 -n freelance-backend
```

## Production Deployment Steps

### 1. Build Production Images

```cmd
REM Use unique tags for production (e.g., git hash or version)
SET VERSION=1.0.0

REM Backend services
cd backend/services/service-a
mvn clean package -DskipTests
docker build -t freelance/service-a:%VERSION% .

cd ../service-b
mvn clean package -DskipTests
docker build -t freelance/service-b:%VERSION% .

REM Frontend
cd ../../frontend
docker build -t freelance/frontend:%VERSION% .
```

### 2. Push to Container Registry

```cmd
REM Replace registry.example.com with your registry
docker tag freelance/service-a:%VERSION% registry.example.com/freelance/service-a:%VERSION%
docker tag freelance/service-b:%VERSION% registry.example.com/freelance/service-b:%VERSION%
docker tag freelance/frontend:%VERSION% registry.example.com/freelance/frontend:%VERSION%

docker push registry.example.com/freelance/service-a:%VERSION%
docker push registry.example.com/freelance/service-b:%VERSION%
docker push registry.example.com/freelance/frontend:%VERSION%
```

### 3. Update Kubernetes Manifests

Update image tags in all k8s/deployment.yaml files to match your registry and version:

```yaml
spec:
  containers:
    - name: service-a
      image: registry.example.com/freelance/service-a:1.0.0
```

### 4. Deploy to Production Cluster

```cmd
REM Assuming kubectl is configured for production cluster
kubectl create namespace freelance-prod

REM Deploy backend services
kubectl apply -f backend/k8s/namespace.yaml
kubectl apply -f backend/services/service-a/k8s/ -n freelance-prod
kubectl apply -f backend/services/service-b/k8s/ -n freelance-prod

REM Deploy frontend
kubectl apply -f frontend/k8s/ -n freelance-prod
```

## Service Communication

### Local Development
- Frontend -> Backend Services:
  - Direct HTTP calls to localhost ports (8080, 8081)
  - Configure Angular environment.ts with service URLs
  - CORS enabled in Spring Boot services for localhost

### Kubernetes (Local/Prod)
- Service Discovery:
  - Services communicate using Kubernetes service names
  - Example URL: http://service-a.freelance-backend.svc.cluster.local
- Inter-service communication:
  - Using Kubernetes ClusterIP services
  - Service A -> Service B: http://service-b
  - Frontend -> Backend: Via Ingress/Service

## Monitoring & Management

### Local Development
- Spring Boot Actuator endpoints (if enabled):
  - Health: http://localhost:8080/actuator/health
  - Metrics: http://localhost:8080/actuator/metrics
- Angular Dev Tools in browser

### Kubernetes
Monitor deployments:
```cmd
kubectl get pods -n freelance-backend -w
kubectl logs -f deployment/service-a -n freelance-backend
kubectl describe pod -l app=service-a -n freelance-backend
```

## Troubleshooting

### Local Development
1. Service not starting:
   - Check port conflicts
   - Verify Java/Node versions
   - Check application.properties/environment.ts configs

### Kubernetes
1. Pods not running:
   ```cmd
   kubectl describe pod <pod-name> -n freelance-backend
   kubectl logs <pod-name> -n freelance-backend
   ```

2. Services not accessible:
   ```cmd
   kubectl get endpoints -n freelance-backend
   kubectl describe svc service-a -n freelance-backend
   ```

3. Image pull issues:
   - Verify images are loaded (Minikube/Kind)
   - Check image tags in deployments
   - Verify registry credentials if using private registry

## Next Steps & Improvements

1. Add Ingress Controller:
   - Install nginx-ingress
   - Configure TLS
   - Set up domain routing

2. Add Monitoring:
   - Prometheus & Grafana
   - Spring Boot Actuator metrics
   - Angular performance monitoring

3. CI/CD Pipeline:
   - GitHub Actions for builds
   - Automated testing
   - Deployment automation

4. Security:
   - Add API Gateway
   - Implement authentication
   - Set up network policies
