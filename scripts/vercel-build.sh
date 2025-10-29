#!/usr/bin/env bash
set -euo pipefail

echo "Starting vercel-build script"

if [ -z "${DATABASE_URL:-}" ]; then
  echo "ERROR: DATABASE_URL is not set. Aborting."
  exit 1
fi

# Quick validation: fail if DATABASE_URL contains spaces, double quotes, or raw '#'
if printf '%s' "$DATABASE_URL" | grep -q '[[:space:]\"]'; then
  echo "ERROR: DATABASE_URL contains whitespace or double quotes. Ensure there are no spaces/newlines and do NOT wrap the value in quotes in Vercel."
  echo "If your password contains special characters (e.g. @, :, #), URL-encode them. Example: '@' -> '%40'"
  echo "See: https://www.prisma.io/docs/reference/database-reference/connection-urls"
  exit 1
fi

if printf '%s' "$DATABASE_URL" | grep -q "#"; then
  echo "ERROR: DATABASE_URL contains a raw '#' character which must be URL-encoded as '%23'."
  echo "Please URL-encode any '#' in your password or query part."
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
