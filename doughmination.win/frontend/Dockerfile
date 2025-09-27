# Option 1: Use Ubuntu base instead of Alpine (most reliable)
FROM node:20-slim

# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with corrected npm configuration for Docker
RUN npm install --ignore-scripts && npm rebuild

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 8001

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8001/ || exit 1

# Start the preview server
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "8001"]