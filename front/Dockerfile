FROM node:20.18.0-slim AS base
ARG PORT=3000
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

COPY --from=build /src/.output /src/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

EXPOSE $PORT

CMD [ "node", ".output/server/index.mjs" ]