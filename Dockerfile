# Step 1: Use an official Node.js image as a base image
FROM node:14

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of the application files
COPY . .

# Step 5: Expose port for the app
EXPOSE 3000

# Step 6: Define the command to start the app
CMD ["npm", "start"]
