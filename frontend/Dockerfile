# ============================================
# Stage 1: Dependencies (cached layer)
# ============================================
FROM node:18-alpine AS dependencies
WORKDIR /app

# Copy only package files for better caching
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# ============================================
# Stage 2: Builder (runs at container startup)
# ============================================
FROM node:18-alpine AS builder
WORKDIR /app

# Copy dependencies from previous stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build will happen at container startup via entrypoint
# This allows REACT_APP_API_URL to be available from PreviewCloud

# ============================================
# Stage 3: Production (serves static files)
# ============================================
FROM nginx:alpine AS production

# Install Node.js for runtime build
RUN apk add --no-cache nodejs npm

# Copy dependencies and source from builder
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app ./

# Create nginx config
RUN echo 'server {' > /etc/nginx/http.d/default.conf && \
  echo '    listen 80;' >> /etc/nginx/http.d/default.conf && \
  echo '    server_name _;' >> /etc/nginx/http.d/default.conf && \
  echo '    root /app/build;' >> /etc/nginx/http.d/default.conf && \
  echo '    index index.html;' >> /etc/nginx/http.d/default.conf && \
  echo '    location / {' >> /etc/nginx/http.d/default.conf && \
  echo '        try_files $uri $uri/ /index.html;' >> /etc/nginx/http.d/default.conf && \
  echo '    }' >> /etc/nginx/http.d/default.conf && \
  echo '}' >> /etc/nginx/http.d/default.conf

# Create entrypoint script
RUN echo '#!/bin/sh' > /entrypoint.sh && \
  echo 'set -e' >> /entrypoint.sh && \
  echo 'echo "🔨 Building React app with environment variables..."' >> /entrypoint.sh && \
  echo 'echo "   REACT_APP_API_URL=${REACT_APP_API_URL:-not-set}"' >> /entrypoint.sh && \
  echo 'cd /app && npm run build' >> /entrypoint.sh && \
  echo 'echo "✅ Build complete!"' >> /entrypoint.sh && \
  echo 'echo "🚀 Starting nginx..."' >> /entrypoint.sh && \
  echo 'exec nginx -g "daemon off;"' >> /entrypoint.sh && \
  chmod +x /entrypoint.sh

EXPOSE 80

CMD ["/entrypoint.sh"]