#!/usr/bin/env bash
set -euo pipefail

echo "Starting vercel-build script"

if [ -z "${DATABASE_URL:-}" ]; then
  echo "ERROR: DATABASE_URL is not set. Aborting."
  exit 1
fi

case "$DATABASE_URL" in
  file:*)
    echo "Detected SQLite DATABASE_URL. Running prisma generate + db push"
    npx prisma generate
    npx prisma db push --accept-data-loss
    npm run build
    ;;
  postgres:*|postgresql:*)
    echo "Detected Postgres DATABASE_URL. Running prisma generate + migrate deploy"
    npx prisma generate
    npx prisma migrate deploy
    npm run build
    ;;
  mysql:*|mysql2:*)
    echo "Detected MySQL DATABASE_URL. Running prisma generate + migrate deploy"
    npx prisma generate
    npx prisma migrate deploy
    npm run build
    ;;
  *)
    echo "Unknown DATABASE_URL scheme; falling back to prisma generate + db push"
    npx prisma generate
    npx prisma db push --accept-data-loss
    npm run build
    ;;
esac

echo "vercel-build finished"
