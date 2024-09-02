# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock into the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code into the container
COPY . .

# Build the application
RUN yarn build

# Expose the port that the app runs on
EXPOSE 3000

# Define the command to start the app
CMD ["yarn", "preview", "--port", "3000", "--host"]
