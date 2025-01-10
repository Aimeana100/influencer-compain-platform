# Step 1: Use an official Node.js image as the base image
FROM node:20-alpine

# Step 2: Set the working directory inside the container

WORKDIR /app/backend


# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install --production

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the NestJS app
RUN npm run build

# Step 7: Expose the app port
EXPOSE 4000

# Step 8: Start the application
CMD ["npm", "run", "start:prod"]