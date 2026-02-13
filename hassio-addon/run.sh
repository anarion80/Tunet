#!/usr/bin/with-contenv bashio
echo "Starting Tunet Dashboard v1.0.3..."
echo "Build verification: COMMIT_2026_02_14_FIX_WEBSOCKET"
cd /app

# Show what files are actually deployed
echo "Deployed JS files:"
ls -la dist/assets/*.js 2>/dev/null || echo "No JS files found!"

export NODE_ENV=production
export PORT=3002
exec node server/index.js
