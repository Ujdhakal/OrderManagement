```markdown
# Order Management Microservice

## Overview

This repository contains a TypeScript-based microservice for managing orders globally. It is built with [NestJS](https://nestjs.com/) and designed with scalability, maintainability, and clear design patterns in mind. The service focuses on:

- **Creating Orders:** Accept product and quantity details, validate customer and inventory data, and persist the new order.
- **Updating Orders:** 
  - Update shipping information (tracking company and number).
  - Update order status (e.g. processing, canceled, delivered).
- **Deleting Orders:** Remove orders when needed.

This microservice is intended to run in a large-scale environment, potentially handling millions of orders across global storefronts. Although the code is not fully production-ready, it serves as a showcase of code quality, structure, design patterns, and thoughtful architectural decisions.

## Key Features

- **TypeScript & NestJS:** Provides a scalable and well-structured framework.
- **DTO Validation:** Ensures incoming requests are properly validated using `class-validator` and `class-transformer`.
- **Clear Separation of Concerns:**
  - Controllers handle HTTP requests and responses.
  - Services encapsulate business logic.
  - Repositories abstract persistence.
- **Integration with External Services:**
  - Mocked Customer Service integration to validate customer data.
  - Mocked Inventory Service integration to ensure products are in stock.
  
## Architecture & Design Patterns

- **Hexagonal / Layered Architecture:** 
  - **Controller Layer:** HTTP endpoints.
  - **Service Layer:** Business logic, orchestrating requests to repositories and external services.
  - **Repository Layer:** Interactions with the database (using TypeORM).
- **DTOs & Validation:** Ensures correct and safe data flow.
- **External Service Communication:** Demonstrated via simple `HttpService` calls, which can be extended with:
  - Circuit breakers for resilience.
  - Message queues (e.g., SQS) for asynchronous processing.
- **Scalability & Future Considerations:**
  - Horizontal scaling of ECS services in AWS.
  - Potential caching (e.g., Redis via ElastiCache) for frequent lookups.
  - Load balancing with AWS ALB or API Gateway.
  - Persistent storage with RDS or DynamoDB.
  
## Known Limitations

- **Partial Implementation:** Some functionalities (like authentication, authorization, comprehensive error handling, retries, circuit breakers) are mocked or not fully implemented.
- **No Comprehensive Test Suite:** Unit and integration tests can be added for quality assurance.
- **No CI/CD Pipeline Setup:** In a real-world scenario, you would integrate AWS CodePipeline, CodeBuild, and CodeDeploy or GitHub Actions.

## Future Work

- **Add Unit & Integration Tests:** Increase reliability and confidence in the codebase.
- **Implement Caching & Circuit Breakers:** Improve performance and resilience against external service failures.
- **Distributed Tracing & Observability:** Integrate OpenTelemetry or AWS X-Ray for better insights.
- **Authentication & Authorization:** Add JWT or OAuth2 flows to secure endpoints.
- **Infrastructure as Code:** Write Terraform or CloudFormation templates to provision AWS resources easily.
  
## How to Run Locally

### Prerequisites

- **Node.js & npm:** Preferably Node.js 20.x or a current LTS version.
- **TypeScript:** Installed as a dev dependency.
- **NestJS CLI (optional):** `npm install -g @nestjs/cli`

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/--/order-management-service.git
   cd order-management-service
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run start:dev
   ```

   By default, the server will run on `http://localhost:3000`.

4. **Test the Endpoints:**
   - **Create Order:**
     ```bash
     curl -X POST http://localhost:3000/v1/orders \
       -H "Content-Type: application/json" \
       -d '{"customerId": "cust123", "items": [{"productId": "prod1", "variantId": "var1", "quantity": 2}]}'
     ```
   
   - **Update Order Status:**
     ```bash
     curl -X PUT http://localhost:3000/v1/orders/<orderId>/status \
       -H "Content-Type: application/json" \
       -d '{"status": "delivered"}'
     ```

   Adjust `<orderId>` with the actual order ID returned from the create call.

## AWS Deployment Considerations

- **Compute:** Run on ECS Fargate or EKS for containerized deployment and easy scalability.
- **Database:** Use Amazon RDS (e.g., Postgres) for structured queries or DynamoDB for massive scale and flexible schema.
- **Load Balancing & API Gateway:** Front the service with an ALB or API Gateway for routing and scaling.
- **Security & Observability:**
  - IAM roles and policies to secure resource access.
  - Secrets Manager or Parameter Store for sensitive configuration.
  - CloudWatch and X-Ray for logging, metrics, and tracing.
- **CI/CD:** Use CodePipeline and CodeBuild for automated testing and deployment. Blue/Green deployments with CodeDeploy for zero-downtime releases.

## Contact & License

- **Author:** test@gmail.com
- **License:** MIT


```
