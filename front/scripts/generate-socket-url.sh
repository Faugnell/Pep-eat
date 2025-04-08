#!/bin/bash
echo "Génération de NUXT_PUBLIC_SOCKET_URL..."

echo "NUXT_PUBLIC_SOCKET_URL=http://${API_NOTIFICATION_SERVICE_HOST}:${API_NOTIFICATION_SERVICE_PORT}" > .env.generated

cat .env.generated