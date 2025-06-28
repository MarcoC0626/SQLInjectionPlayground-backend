# Use Node.js 20 LTS version
FROM node:23-alpine

# Set working directory
WORKDIR /SQLInjectionPlayground

# Install nodemon globally
RUN npm install -g nodemon

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install && npm install --save-dev ts-node typescript

# Copy source code
COPY . .

ENV NODE_ENV=development
ENV PORT=3001
ENV HOST=0.0.0.0
ENV NODE_OPTIONS="--max-old-space-size=8192"

# Expose the API port
EXPOSE 3001

# Command to run the application with nodemon
CMD ["nodemon", "--legacy-watch", "src/server.js", "--watch", "src", "--ext", "js, ts, json"]