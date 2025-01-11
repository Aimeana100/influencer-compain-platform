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
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

### **Local Setup**

1. **Clone the Repository**:

   ```bash
   git https://github.com/Aimeana100/influencer-compain-platform.git
   cd influencer-compain-platform


2. **Set Up Environment Variables:**:

     Create a `.env` file in the `backend` directory and provide the following details:

   ```bash
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/influencer-campaign-tracker
   JWT_SECRET=your_secret_key
   ```



3. **Run the Application with Docker:**

   Build and start the application using Docker Compose:

    ``` docker compose up --build```    
- The backend will be accessible at http://localhost:4000
- View API documentation at http://localhost:4000/docs





## Project Structure

   