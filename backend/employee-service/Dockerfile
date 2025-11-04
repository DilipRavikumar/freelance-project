# Development-optimized Dockerfile for employee-service
FROM maven:3.8.8-eclipse-temurin-21

WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn package -DskipTests

EXPOSE 8080
CMD ["mvn", "spring-boot:run"]