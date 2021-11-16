# Use a base image

FROM node:16-alpine

# Setting environment variable 
ENV CI=true

# Set Workdir

WORKDIR /app

# Run other commands

COPY ./package.json ./
RUN npm install

COPY ./ ./

# Default startup command
CMD ["npm", "start"]