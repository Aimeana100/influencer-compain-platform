# Step 1: Use an official Node.js image as the base image
FROM node:20-alpine

# Step 2: Set the working directory inside the container

WORKDIR /app/backend


# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 5: Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Step 4: Install dependencies
RUN npm install



# Step 6: Copy the rest of the application code
COPY . .

# Step 7: Build the NestJS app
RUN yarn build

# Step 8: Expose the app port
EXPOSE 4000

# Step 9: Start the application
CMD ["npm", "run", "start:prod"]