# Build stage
FROM node:18-alpine as build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files to nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create entrypoint script that generates config.js at runtime
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'cat > /usr/share/nginx/html/config.js <<EOF' >> /docker-entrypoint.sh && \
    echo 'window.APP_CONFIG = {' >> /docker-entrypoint.sh && \
    echo '  API_URL: "${API_URL:-http://localhost:5000}"' >> /docker-entrypoint.sh && \
    echo '};' >> /docker-entrypoint.sh && \
    echo 'EOF' >> /docker-entrypoint.sh && \
    echo 'exec nginx -g "daemon off;"' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

EXPOSE 80
CMD ["/docker-entrypoint.sh"]