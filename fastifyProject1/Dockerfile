FROM node:18

WORKDIR /app

# Install dependencies first for better caching
COPY package*.json ./
COPY prisma ./prisma/

# Install with unsafe-perm flag for Windows
RUN npm install --unsafe-perm
RUN npx prisma generate

# Copy application files
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]