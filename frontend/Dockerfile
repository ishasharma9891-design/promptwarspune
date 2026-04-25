# Stage 1: Build the React app
FROM node:20-slim as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose the port Cloud Run uses (8080)
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
