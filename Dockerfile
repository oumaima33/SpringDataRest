# Use a base image with JDK for building the application
FROM maven:3.8.5-openjdk-17 as build

# Set working directory in the container
WORKDIR /app

# Copy Maven project files and install dependencies
COPY pom.xml .
COPY src ./src

# Package the application
RUN mvn clean package -DskipTests

# Run stage
FROM openjdk:17-jdk-slim

# Set working directory and copy the jar from the build stage
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Expose the port that the Spring Boot app will run on
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
