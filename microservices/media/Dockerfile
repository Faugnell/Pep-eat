FROM node:18-alpine AS base

WORKDIR /src

FROM base AS build
# Install dependencies
COPY --link package.json package-lock.json .
RUN npm install
# Build the application
COPY --link . .
RUN npm run build

# Set environment variables
ARG PORT=3107
ENV PORT=$PORT
ENV NODE_ENV=production
ENV MONGO_CONNECTION_STRING=mongodb+srv://doadmin:T047v2J9G1CVP8j3@pepeat-mongo-db-ac667bc3.mongo.ondigitalocean.com/pepeat?tls=true&authSource=admin&replicaSet=pepeat-mongo-db

EXPOSE $PORT

CMD ["npm", "start"]