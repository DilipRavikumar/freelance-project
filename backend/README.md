# Backend Kubernetes microservices

This folder contains a simple starter structure to run multiple Spring Boot microservices (service-a and service-b) and Kubernetes manifests to deploy them.

Goals
- Provide two minimal Spring Boot services (http endpoints "/")
- Provide Dockerfiles for containerization
- Provide Kubernetes Deployment + Service manifests
- Document build and deploy steps for local clusters (Minikube/Kind) and for Docker-based deployment

Layout
```
backend/
  README.md                # this file
  .gitignore
  k8s/
    namespace.yaml
  services/
    service-a/
      pom.xml
      Dockerfile
      src/...
      k8s/deployment.yaml
      k8s/service.yaml
    service-b/  (same layout)
```

Prerequisites
- Java 17 JDK (for building locally)
- Maven
- Docker (or a local container runtime)
- kubectl
- Optional: Minikube or Kind for local Kubernetes cluster

Build and produce Docker images (Windows - cmd.exe)

1) Build both services using Maven and Docker. From the repository root:

   REM Build service-a
   cd backend\services\service-a
   mvn -DskipTests package
   docker build -t freelance/service-a:latest .

   REM Build service-b
   cd ..\service-b
   mvn -DskipTests package
   docker build -t freelance/service-b:latest .

Notes:
- If using Minikube, either build images inside Minikube (minikube image build) or load them into Minikube: `minikube image load freelance/service-a:latest` (PowerShell/cmd compatible when invoked via minikube command).
- If using Kind, use `kind load docker-image freelance/service-a:latest --name <cluster-name>`.

Deploy to Kubernetes (Windows - cmd.exe)

1) Create namespace (optional):
   kubectl apply -f backend/k8s/namespace.yaml

2) Deploy service-a and service-b:
   kubectl apply -f backend/services/service-a/k8s/deployment.yaml -n freelance-backend
   kubectl apply -f backend/services/service-a/k8s/service.yaml -n freelance-backend

   kubectl apply -f backend/services/service-b/k8s/deployment.yaml -n freelance-backend
   kubectl apply -f backend/services/service-b/k8s/service.yaml -n freelance-backend

3) Verify:
   kubectl get pods -n freelance-backend
   kubectl get svc -n freelance-backend

Expose for local testing
- Using port-forward (quick):
  kubectl port-forward svc/service-a 8080:80 -n freelance-backend
  kubectl port-forward svc/service-b 8081:80 -n freelance-backend

Then visit http://localhost:8080 and http://localhost:8081

Using Minikube tunnel / NodePort / Ingress
- For production-like tests, configure an Ingress or NodePort. Ingress requires an ingress controller (e.g., ingress-nginx).

Tips
- Use unique image tags (e.g., :dev-<git-hash>) to avoid caching confusion.
- For CI, build and push images to a registry and update k8s manifests with the registry path.

Next steps / improvements
- Add a shared library module for common DTOs/config
- Add Health endpoints and liveness probes
- Add Helm charts or Kustomize overlays for different environments
- Add GitHub Actions for CI/CD building/pushing images and deploying to clusters

