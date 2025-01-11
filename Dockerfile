# Use an official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container

WORKDIR /app/backend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the NestJS app
RUN yarn build

# Expose the app port
EXPOSE 4000

# Start the application
CMD ["yarn", "start:prod"]