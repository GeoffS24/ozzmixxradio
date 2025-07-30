#!/bin/bash

# Development Reset Script
# Use this script when encountering chunk loading errors or other dev issues

echo "🔄 Resetting development environment..."

# Kill any running Next.js processes
echo "🛑 Stopping any running processes..."
pkill -f "next dev" || true

# Clear Next.js cache
echo "🗑️  Clearing Next.js cache..."
rm -rf .next

# Clear node_modules cache (optional - uncomment if needed)
# echo "🗑️  Clearing node_modules cache..."
# rm -rf node_modules/.cache

# Clear browser cache instruction
echo "🌐 Please clear your browser cache:"
echo "   - Chrome/Edge: Ctrl+Shift+R (Cmd+Shift+R on Mac)"
echo "   - Firefox: Ctrl+F5 (Cmd+Shift+R on Mac)"
echo "   - Safari: Cmd+Option+R"

# Restart development server
echo "🚀 Starting development server..."
npm run dev

echo "✅ Reset complete! Your dev server should be running without issues."
echo "📍 Access your site at: http://localhost:3000"
echo "📍 Access Sanity Studio at: http://localhost:3000/studio"
