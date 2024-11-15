
# Spring/react App

## Overview
A web application built with Spring Boot for managing car listings. This application allows users to view, add, edit, and delete cars seamlessly. It features a user-friendly interface and incorporates best practices in software development.

## Features

- **View Cars**: Display a list of all available cars with their details.
- **Add Cars**: Easily add new car listings through a simple form.
- **Edit Cars**: Modify existing car details using an intuitive editing interface.
- **Delete Cars**: Remove car listings with confirmation to prevent accidental deletions.
- **API Documentation**: Automatically generated documentation using Swagger.
- **Monitoring**: Use Prometheus and Grafana for monitoring application performance and metrics.
- **Health Checks**: Built-in Spring Boot Actuator for health checks and metrics.

## Technologies Used

- **Backend**: 
  - Spring Boot
  - Swagger for API documentation
  - JUnit for testing
  - Prometheus for monitoring
  - Spring Boot Actuator for application management and monitoring
- **Frontend**: 
  - React.js
- **Database**: 
  - mariaadb

## Installation

### Prerequisites

- Java (version x.x)
- Maven (version x.x)
- MariaDb

### Clone the Repository

```bash
git clone https://github.com/oumaima33/SpringDataRest.git
cd SpringDataRestrecent-app
```

### Build the Application

```bash
mvn clean install
```

### Run the Application

```bash
mvn spring-boot:run
```

Open your browser and navigate to `http://localhost:8080` to view the application.

## API Documentation

Access the API documentation generated by Swagger at `http://localhost:8080/swagger-ui.html`.

## Monitoring

- **Prometheus**: Monitor application metrics at `http://localhost:8080/actuator/prometheus`.
- **Grafana**: Connect Grafana to Prometheus for visualization of metrics.

## Testing

Run the tests using:

```bash
mvn test
```
