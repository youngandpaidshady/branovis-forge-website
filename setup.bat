@echo off
echo ========================================
echo Branovis Forge - NPM Setup Script
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo.
    echo Please install Node.js 18+ from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Check Node.js version
echo [INFO] Checking Node.js version...
node --version
echo.

REM Check if npm is installed
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed!
    echo npm should come with Node.js. Please reinstall Node.js.
    echo.
    pause
    exit /b 1
)

echo [INFO] Checking npm version...
npm --version
echo.

echo [INFO] Installing dependencies...
echo This may take a few minutes...
echo.
npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Installation failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Available commands:
echo   npm run dev     - Start development server
echo   npm run build   - Build for production
echo   npm run preview - Preview production build
echo.
echo Starting development server...
echo.
npm run dev



