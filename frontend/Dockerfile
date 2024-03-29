# Use the official Node.js 14 image
FROM node:18.19.1

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Set environment variables if needed
# ENV REACT_APP_API_URL=http://localhost:5000

# Command to start the React app
CMD ["npm", "start"]
