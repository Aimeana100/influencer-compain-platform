# Build
FROM node:20-alpine
WORKDIR /app/backend
COPY package*.json  ./
RUN yarn
COPY . .
RUN yarn build
# RUN yarn run seed

# command to run application
CMD [ "node", "dist/main.js" ]