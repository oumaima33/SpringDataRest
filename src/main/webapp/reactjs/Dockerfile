# Use the official Node.js image for building the React app
FROM node:18-alpine as build

# Set working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files and build the React app
COPY . .
RUN npm run build

# Serve the static files using Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx will use
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
