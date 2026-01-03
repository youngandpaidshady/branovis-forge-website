#!/bin/bash

echo "========================================"
echo "Branovis Forge - NPM Setup Script"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed!"
    echo ""
    echo "Please install Node.js 18+ from: https://nodejs.org/"
    echo ""
    exit 1
fi

# Check Node.js version
echo "[INFO] Checking Node.js version..."
node --version
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "[ERROR] npm is not installed!"
    echo "npm should come with Node.js. Please reinstall Node.js."
    echo ""
    exit 1
fi

echo "[INFO] Checking npm version..."
npm --version
echo ""

echo "[INFO] Installing dependencies..."
echo "This may take a few minutes..."
echo ""
npm install

if [ $? -ne 0 ]; then
    echo ""
    echo "[ERROR] Installation failed!"
    exit 1
fi

echo ""
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Available commands:"
echo "  npm run dev     - Start development server"
echo "  npm run build   - Build for production"
echo "  npm run preview - Preview production build"
echo ""
echo "Starting development server..."
echo ""
npm run dev



