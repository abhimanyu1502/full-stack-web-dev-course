FROM node:22-alpine

WORKDIR /app

# Copy root and subfolder package definitions
COPY package*.json ./
COPY html-mastery/package*.json ./html-mastery/

# Install dependencies if any
RUN npm install --omit=dev || true

# Copy all application files
COPY . .

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV DATABASE_DIR=/data

# Create persistent data volume directory
RUN mkdir -p /data

EXPOSE 5000

VOLUME ["/data"]

CMD ["node", "html-mastery/server/index.js"]
