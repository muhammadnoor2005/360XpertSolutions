# Use official Node.js LTS image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose port your app runs on
EXPOSE 3000

# Start the app
CMD [ "node", "index.js" ]
