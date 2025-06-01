# Use Node.js as base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the port Next.js will run on
EXPOSE 3000

# Run the frontend app
CMD ["npm", "run", "dev"]
