# Kubernetes Networking Architecture - Freelance Microservices

## Overview
This document explains how Kubernetes networking works in our freelance microservices project, specifically focusing on the frontend Angular application deployment and service discovery.

## Architecture Components

### 1. Cluster Setup
- **Platform**: Docker Desktop's built-in Kubernetes (Windows)
- **Cluster Endpoint**: `https://kubernetes.docker.internal:6443`
- **Network**: Docker Desktop automatically handles LoadBalancer → localhost mapping

### 2. Frontend Application Flow

```
User Request (localhost:4200) 
    ↓
LoadBalancer Service (frontend)
    ↓
Pod Selection (Round Robin)
    ↓
nginx Container (Port 80)
    ↓
Angular SPA (index.html)
```

## Kubernetes Resources

### Deployment Configuration
```yaml
# Creates 2 replica pods for high availability
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    spec:
      containers:
      - name: frontend
        image: frontend:latest
        imagePullPolicy: Never  # Uses local Docker image
        ports:
        - containerPort: 80     # nginx serves on port 80
```

### Service Configuration
```yaml
# Exposes pods externally and provides load balancing
apiVersion: v1
kind: Service
metadata:
  name: frontend
spec:
  selector:
    app: frontend
  ports:
  - port: 4200          # External access port
    targetPort: 80      # Container port
    protocol: TCP
  type: LoadBalancer    # Docker Desktop maps to localhost
```

## Network Flow Details

### 1. Pod Creation Process
```
Deployment Controller → ReplicaSet → 2 Pods Created
Pod 1: IP 10.1.0.35:80 (nginx container)
Pod 2: IP 10.1.0.36:80 (nginx container)
```

### 2. Service Discovery
```
Service "frontend" → Endpoints: 10.1.0.35:80, 10.1.0.36:80
LoadBalancer → Automatically mapped to localhost:4200
```

### 3. Request Routing
```
localhost:4200 → Service frontend → Pod (load balanced) → nginx:80 → Angular App
```

## nginx Configuration for SPA

### Problem Solved
Angular is a Single Page Application (SPA) that uses client-side routing. Without proper nginx configuration, direct navigation or page refresh results in 404 errors.

### Solution
```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;  # Fallback to index.html for SPA routing
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;                        # Cache static assets
        add_header Cache-Control "public, immutable";
    }
}
```

## Key Networking Concepts

### ClusterIP vs LoadBalancer
- **ClusterIP**: Internal pod communication (10.1.0.x network)
- **LoadBalancer**: External access via Docker Desktop (localhost mapping)

### Service Types in Our Setup
- **frontend service**: LoadBalancer (external access)
- **mysql-service**: ClusterIP (internal only)
- **employee-service**: ClusterIP (internal only)

### Port Mapping Strategy
```
External Port → Service Port → Container Port
localhost:4200 → frontend:4200 → nginx:80
localhost:3306 → mysql:3306 → mysql:3306
localhost:8080 → employee:8080 → spring-boot:8080
```

## Troubleshooting Commands

### Check Pod Status
```bash
kubectl get pods -l app=frontend
kubectl logs -l app=frontend
```

### Verify Service Endpoints
```bash
kubectl get endpoints frontend
kubectl get svc frontend
```

### Test Internal Connectivity
```bash
kubectl exec deployment/frontend -- wget -qO- http://localhost:80
```

### Debug Network Issues
```bash
kubectl describe pod <pod-name>
kubectl describe service frontend
```

## High Availability Features

### Pod Redundancy
- 2 replica pods ensure service availability
- If one pod fails, traffic routes to healthy pod
- Rolling updates maintain zero downtime

### Load Balancing
- Service automatically distributes requests
- Round-robin algorithm by default
- Health checks ensure traffic goes to ready pods

## Security Considerations

### Network Policies
- Pods communicate within cluster network
- External access only through defined services
- Internal services (mysql, employee-service) not exposed externally

### Image Security
- `imagePullPolicy: Never` uses local images only
- No external registry dependencies
- Controlled image versions

## Performance Optimizations

### nginx Caching
- Static assets cached for 1 year
- Reduces repeated file transfers
- Improves page load times

### Pod Resource Management
```yaml
resources:
  requests:
    memory: "64Mi"
    cpu: "250m"
  limits:
    memory: "128Mi"
    cpu: "500m"
```

## Monitoring & Observability

### Health Checks
```yaml
livenessProbe:
  httpGet:
    path: /
    port: 80
  initialDelaySeconds: 30
  periodSeconds: 10
```

### Metrics Collection
- Container resource usage
- Request latency through service
- Pod restart counts

---

## Quick Reference

### Deploy Frontend
```bash
kubectl apply -f k8s/frontend-deployment.yaml
```

### Update Frontend
```bash
docker build -t frontend:latest frontend/
kubectl rollout restart deployment frontend
```

### Access Application
- Frontend: http://localhost:4200
- Check status: `kubectl get all`