FROM node:18-alpine

# Install additional language runtimes
RUN apk add --no-cache \
    python3 \
    py3-pip \
    g++ \
    openjdk17

WORKDIR /app

# Copy runner script
COPY runner.js .

# Default command
ENTRYPOINT ["node", "runner.js"]