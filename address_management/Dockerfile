# Use a base image with Java
FROM openjdk:17-jdk-slim AS build

# Set the working directory
WORKDIR /app

# Copy the Maven wrapper and pom.xml
COPY .mvn/ .mvn
COPY mvnw .
COPY pom.xml .

# Ensure the Maven wrapper is executable
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline

# Copy the source code and compile the application
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Use a base image with Java to run the application
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the compiled application from the build stage
COPY --from=build /app/target/address_management-0.0.1-SNAPSHOT.jar app.jar

ENV DB_PASSWORD=${DB_PASSWORD}

# Expose the application port
EXPOSE 8081

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]