# Minikube Deployment Guide - Freelance Management Platform

## Overview

This document covers the migration from Docker Desktop Kubernetes to Minikube for the Freelance Management Platform, highlighting the differences, benefits, and deployment strategies.

## Why Minikube?

### Advantages over Docker Desktop Kubernetes

1. **True Kubernetes Environment**
   - Closer to production Kubernetes clusters
   - Better simulation of real-world scenarios
   - More accurate networking and service discovery

2. **Resource Control**
   - Dedicated VM with configurable resources
   - Better isolation from host system
   - Predictable performance characteristics

3. **Add-ons Ecosystem**
   - Rich set of Kubernetes add-ons (Ingress, Dashboard, Metrics)
   - Easy enable/disable of cluster features
   - Better development and testing capabilities

4. **Multi-Node Support**
   - Can simulate multi-node clusters
   - Better for testing distributed applications
   - Realistic load balancing scenarios

5. **Version Flexibility**
   - Support for multiple Kubernetes versions
   - Easy switching between versions
   - Better compatibility testing

## Migration Changes Made

### 1. Docker Environment Configuration

**Before (Docker Desktop):**
```bash
# Images built directly in Docker Desktop
docker build -t frontend:latest frontend/
```

**After (Minikube):**
```bash
# Point Docker CLI to Minikube's daemon
minikube docker-env --shell cmd
SET DOCKER_TLS_VERIFY=1
SET DOCKER_HOST=tcp://127.0.0.1:49682
SET DOCKER_CERT_PATH=C:\Users\dilip\.minikube\certs
SET MINIKUBE_ACTIVE_DOCKERD=minikube

# Build images in Minikube's Docker environment
docker build -t frontend:latest frontend/
```

### 2. Service Access Methods

**Docker Desktop:**
- LoadBalancer automatically mapped to localhost
- Direct access via `http://localhost:4200`

**Minikube Options:**

#### Option 1: Service Tunneling
```bash
minikube service frontend --url
# Returns: http://127.0.0.1:62699
# Requires terminal to stay open
```

#### Option 2: Port Forwarding (Recommended)
```bash
kubectl port-forward service/frontend 4200:4200
kubectl port-forward service/employee-service 8080:8080
# Access: http://localhost:4200, http://localhost:8080
```

#### Option 3: NodePort Services
```yaml
# Changed from LoadBalancer to NodePort
spec:
  type: NodePort
  ports:
  - port: 4200
    targetPort: 80
    nodePort: 30080  # Optional: specify port
```

Access via: `http://<minikube-ip>:30080`

### 3. Network Configuration Updates

**Frontend Environment Configuration:**
```typescript
// Updated for Minikube service URLs
export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:57071',  // Dynamic Minikube URL
  employeeServiceUrl: 'http://127.0.0.1:57071'
};
```

**Service Discovery:**
- Internal service communication remains the same
- External access methods changed
- DNS resolution works identically

## Deployment Process

### 1. Start Minikube
```bash
minikube start
# Optional: Specify resources
minikube start --cpus=4 --memory=8192
```

### 2. Configure Docker Environment
```bash
# Get environment variables
minikube docker-env --shell cmd

# Set variables (Windows CMD)
SET DOCKER_TLS_VERIFY=1
SET DOCKER_HOST=tcp://127.0.0.1:49682
SET DOCKER_CERT_PATH=C:\Users\dilip\.minikube\certs
SET MINIKUBE_ACTIVE_DOCKERD=minikube
```

### 3. Build Images
```bash
docker build -t frontend:latest frontend/
docker build -t employee-service:latest backend/employee-service/
```

### 4. Deploy to Cluster
```bash
kubectl apply -f k8s/
```

### 5. Access Services
```bash
# Method 1: Port forwarding (Recommended)
kubectl port-forward service/frontend 4200:4200
kubectl port-forward service/employee-service 8080:8080

# Method 2: Service tunneling
minikube service frontend --url
minikube service employee-service --url

# Method 3: NodePort (if configured)
minikube ip  # Get cluster IP
# Access via http://<minikube-ip>:<nodeport>
```

## Service Configuration Comparison

### LoadBalancer vs NodePort

**LoadBalancer (Docker Desktop):**
```yaml
spec:
  type: LoadBalancer
  ports:
  - port: 4200
    targetPort: 80
# Automatically gets external IP (localhost)
```

**NodePort (Minikube):**
```yaml
spec:
  type: NodePort
  ports:
  - port: 4200
    targetPort: 80
    nodePort: 30080  # Accessible via minikube-ip:30080
```

## Troubleshooting

### Common Issues

1. **Images Not Found**
   ```bash
   # Ensure Docker environment is set
   minikube docker-env --shell cmd
   # Run the SET commands, then rebuild images
   ```

2. **Service Unreachable**
   ```bash
   # Check pod status
   kubectl get pods
   
   # Check service endpoints
   kubectl get endpoints
   
   # Use port-forward as fallback
   kubectl port-forward service/frontend 4200:4200
   ```

3. **Connection Refused**
   ```bash
   # Restart Minikube if needed
   minikube stop
   minikube start
   
   # Rebuild and redeploy
   kubectl rollout restart deployment frontend
   ```

### Debug Commands

```bash
# Cluster status
minikube status

# Get cluster IP
minikube ip

# SSH into Minikube
minikube ssh

# View cluster dashboard
minikube dashboard

# Check logs
kubectl logs -l app=frontend
kubectl logs -l app=employee-service
```

## Performance Considerations

### Resource Allocation
```bash
# Start with specific resources
minikube start --cpus=4 --memory=8192 --disk-size=20g

# Check resource usage
kubectl top nodes
kubectl top pods
```

### Optimization Tips
1. **Image Size**: Use multi-stage builds to reduce image size
2. **Resource Limits**: Set appropriate CPU/memory limits
3. **Persistent Volumes**: Use for database data persistence
4. **Health Checks**: Configure liveness and readiness probes

## Development Workflow

### Local Development Cycle
```bash
# 1. Make code changes
# 2. Set Minikube Docker environment
minikube docker-env --shell cmd
# Run SET commands

# 3. Rebuild affected images
docker build -t frontend:latest frontend/

# 4. Restart deployment
kubectl rollout restart deployment frontend

# 5. Test changes
kubectl port-forward service/frontend 4200:4200
```

### CI/CD Integration
```yaml
# GitHub Actions example
- name: Setup Minikube
  uses: medyagh/setup-minikube@master
  
- name: Build and Deploy
  run: |
    eval $(minikube docker-env)
    docker build -t frontend:latest frontend/
    kubectl apply -f k8s/
```

## Advanced Features

### Enable Add-ons
```bash
# Enable ingress controller
minikube addons enable ingress

# Enable metrics server
minikube addons enable metrics-server

# Enable dashboard
minikube addons enable dashboard
minikube dashboard
```

### Ingress Configuration
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: freelance-ingress
spec:
  rules:
  - host: freelance.local
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend
            port:
              number: 4200
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: employee-service
            port:
              number: 8080
```

## Comparison Summary

| Feature | Docker Desktop K8s | Minikube |
|---------|-------------------|----------|
| **Setup Complexity** | Low | Medium |
| **Resource Usage** | Shared with Docker | Dedicated VM |
| **Production Similarity** | Good | Excellent |
| **Add-ons Support** | Limited | Extensive |
| **Multi-node Testing** | No | Yes |
| **Version Flexibility** | Limited | High |
| **External Access** | Automatic | Manual setup |
| **Development Speed** | Fast | Medium |
| **Learning Value** | Good | Excellent |

## Amazon Q Developer Prompts for Minikube

### Migration and Setup Prompts

#### Minikube Environment Setup
```
"Help me migrate from Docker Desktop Kubernetes to Minikube for a Spring Boot and Angular microservices application. Include steps for:
- Setting up Minikube with proper resource allocation
- Configuring Docker environment to use Minikube's daemon
- Building images in Minikube's Docker environment
- Updating service configurations for external access"
```

#### Service Access Configuration
```
"Configure Kubernetes services for Minikube deployment with multiple access methods:
- Port forwarding for development
- NodePort services for direct access
- Service tunneling with minikube service command
- Include pros and cons of each approach"
```

#### Troubleshooting and Debugging
```
"Create troubleshooting guide for common Minikube issues:
- ErrImageNeverPull errors when deploying
- Service unreachable problems
- Docker environment configuration issues
- Include kubectl commands for debugging"
```

### Development Workflow Prompts

#### Environment Configuration
```
"Update Angular environment configuration for Minikube deployment:
- Handle dynamic service URLs from minikube service command
- Configure for different access methods (port-forward, NodePort)
- Maintain compatibility between development and production"
```

#### CI/CD Integration
```
"Design CI/CD pipeline for Minikube deployment:
- GitHub Actions workflow with Minikube setup
- Automated image building in Minikube environment
- Testing and deployment automation
- Include rollback strategies"
```

### Advanced Features Prompts

#### Add-ons and Extensions
```
"Configure Minikube add-ons for enhanced development:
- Enable Kubernetes dashboard for cluster visualization
- Set up Ingress controller for routing
- Configure metrics server for resource monitoring
- Add persistent volume support for database"
```

#### Performance Optimization
```
"Optimize Minikube cluster for microservices development:
- Resource allocation (CPU, memory, disk)
- Image optimization strategies
- Pod resource limits and requests
- Health checks and readiness probes"
```

### Networking and Security Prompts

#### Service Mesh Configuration
```
"Implement service discovery and communication in Minikube:
- Internal service-to-service communication
- External service access patterns
- Network policies for security
- Load balancing between pod replicas"
```

#### Ingress and Routing
```
"Create Ingress configuration for Minikube deployment:
- Route frontend and backend through single entry point
- Configure path-based routing (/api for backend)
- Add SSL/TLS termination
- Include custom domain mapping"
```

## Conclusion

Minikube provides a more authentic Kubernetes experience with better control over the cluster environment. While it requires additional setup steps, it offers superior learning opportunities and closer production parity. The port-forwarding approach provides the most reliable access method for development workflows.

For production-like testing and learning Kubernetes concepts, Minikube is the superior choice over Docker Desktop's built-in Kubernetes.

