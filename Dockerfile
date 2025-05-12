FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set proper permissions
RUN chmod -R 755 node_modules/.bin

EXPOSE 3000

# Disable browser auto-opening with BROWSER=none
ENV BROWSER=none

# Start React app
CMD ["npm", "start"]