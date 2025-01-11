# **Influencer Campaign Tracker**

An Influencer Campaign Tracker system built using NestJS and MongoDB to manage influencer campaigns seamlessly. The platform provides tailored views for Brands (or SMEs) and Influencers to handle campaign creation, submission tracking, content approvals, and performance analysis.

---

## **Table of Contents**

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Local Setup](#local-setup)
4. [Project Structure](#project-structure)
5. [Environment Variables](#environment-variables)
6. [Accessing Swagger Documentation](#accessing-swagger-documentation)
7. [Database Seeding](#database-seeding)
8. [CI/CD Pipeline](#ci/cd-pipeline)
9. [Contributing](#contributing)
10. [License](#license)

---

## **Features**

### **For Brands/SMEs**:
- Create and manage campaigns.
- View and approve/reject submissions from influencers.

### **For Influencers**:
- View assigned campaigns.
- Submit content for approval.
- Track approval status of submissions.
---

## **Tech Stack**

- **Backend**: [NestJS](https://nestjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Containerization**: [Docker](https://www.docker.com/)
- **Authentication**: JSON Web Tokens (JWT).
- **CI/CD**: Automated deployment (GitHub Actions & AWS EC2).


----------------------------------------------------------------------------------------
-----------------------



## **Getting Started**

### **Prerequisites**

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18+)
- [Docker](https://www.docker.com/) (Optional)

---

### **Local Setup**

1. **Clone the Repository**:

```bash
   git https://github.com/Aimeana100/influencer-compain-platform.git
   cd influencer-compain-platform
   ```

2. Setting Up MongoDB

- **Option 1:** Using Docker
Run a MongoDB container with Docker:
```markdown
  docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin mongo:latest
  ```
Access MongoDB locally on ```mongodb://admin:admin@localhost:27017```


   - **Option 2:** Installing MongoDB Locally
    Install MongoDB from the [official MongoDB website](https://www.mongodb.com/try/download/community). 
   - The same way you can create a free mongodb cluster from in cloud [Link](https://www.mongodb.com/cloud/atlas/register) (***More advised***)

   Start the MongoDB service (If you downloaded mongodb):
   ```bash
   mongod
   ```

3. **Set Up Environment Variables:**:

Create a `.env` file in the `backend` directory and provide the following details:

   ```bash
   PORT=4000
   MONGO_URI={your_mongodb_uri}
   JWT_SECRET=your_secret_key
   NODE_ENV=development
   ```

4. **Install dependencies and run the Application:**

```markdown

# install
yarn
or
npm install
# stat dev mode
yarn start:dev
```

## Project Structure
[Todo]


# Here’s a markdown version of the features and modules implemented in the Backend for the Influencer Campaign Manager application:

# Backend Features and Modules

## 1. **Campaign Management**
- **Create Campaign**: Allows brands to create new campaigns with details like title, description, budget, end date, and status.
- **Fetch Campaigns**: Retrieve a list of campaigns, including active and upcoming campaigns.
- **Campaign Status Updates**: Change the status of campaigns (e.g., active, completed).

## 2. **Submission Management**
- **Create Submission**: Allows influencers to submit content for specific campaigns by providing a URL and optional performance metrics (views, clicks, conversions).
- **Fetch Submissions**: Retrieve a list of submissions for a specific campaign or influencer.
- **Update Submission**: Update the performance metrics (views, clicks, conversions) of a submission.
- **Submission Status Updates**: Update submission status (e.g., pending, approved, rejected).

## 3. **User Authentication and Authorization**
- **JWT Authentication**: Implemented JWT-based authentication for secure login, session management, and access control.
- **User Roles**: Different roles for users (brand, influencer) with specific permissions.
- **Login**: Users can log in using their credentials and receive a JWT token for authenticated requests.
- **Logout**: Users can log out, invalidating their session.
- **User Registration**: Allows users (brands and influencers) to create new accounts (if implemented).

## 4. **Performance Metrics for Submissions**
- **Track Performance**: Track performance metrics for influencer submissions like views, clicks, and conversions.
- **Update Metrics**: Brands can update the performance metrics based on campaign performance and submission review.

## 5. **Database Models and Schema**
- **Campaign Model**: Schema for storing campaign details (title, description, budget, end date, etc.).
- **Submission Model**: Schema for storing submission details (content URL, performance metrics, campaign association).
- **User Model**: Schema for storing user details (e.g., name, email, role, etc.).
- **MongoDB Database**: Database for storing campaign, submission, and user data (depending on implementation, could be MongoDB or SQL).

## 6. **CRUD Operations**
- **Campaign CRUD**: Full CRUD functionality for campaigns, allowing brands to create, read, update, and delete campaigns.
- **Submission CRUD**: Full CRUD functionality for submissions, allowing influencers to create, read, update, and delete submissions.

## 7. **Deployment and CI/CD**
- **Dockerized Backend**: Dockerize the backend application for consistent deployment across environments (e.g., local, production).
- **CI/CD Pipeline**: Automated pipeline for testing, building, and deploying the backend to servers (e.g., EC2, AWS).

## 8. **Security Features**
- **Data Encryption**: Sensitive data, like passwords, are encrypted using hashing algorithms (e.g., bcrypt).
- **Role-based Access Control (RBAC)**: Ensure users can only access resources based on their roles (brand, influencer).

## 9. **Environment Configuration**
- **Environment Variables**: Use environment variables for sensitive information like database URLs, JWT secret keys, and third-party API keys.
- **Configuration Files**: Externalize configurations such as database settings, port numbers, and API settings to be easily changed for different environments (development, production).

## 10. **API Documentation**
- **OpenAPI (Swagger)**: Provide API documentation for the backend using OpenAPI standards (Swagger), making it easier for front-end developers and third-party integrations.
- **Endpoint Documentation**: Clear documentation for each endpoint, including required parameters, request/response examples, and error codes.

