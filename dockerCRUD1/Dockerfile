# # Dockerfile
FROM node:18

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies and generate Prisma client
RUN npm install
# RUN npx prisma generate

# Copy the rest of the files
COPY . .

CMD ["npm", "run", "dev"]
