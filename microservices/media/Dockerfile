FROM node:20.18.0-slim AS base
ARG PORT=3107
WORKDIR /src

# Build
FROM base AS build
COPY --link package.json package-lock.json .
RUN npm install
COPY --link . .
RUN npm run build

# Run
FROM base
ENV PORT=$PORT
ENV NODE_ENV=production
ENV MONGO_CONNECTION_STRING=mongodb+srv://doadmin:T047v2J9G1CVP8j3@pepeat-mongo-db-ac667bc3.mongo.ondigitalocean.com/pepeat?tls=true&authSource=admin&replicaSet=pepeat-mongo-db

COPY --from=build /src /src
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", "dist/index.js" ]