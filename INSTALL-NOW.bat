@echo off
echo ========================================
echo Node.js Installation Checker
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [SUCCESS] Node.js is installed!
    node --version
    echo.
    
    REM Check npm
    where npm >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo [SUCCESS] npm is installed!
        npm --version
        echo.
        echo ========================================
        echo Proceeding with setup...
        echo ========================================
        echo.
        call setup.bat
    ) else (
        echo [ERROR] npm not found but Node.js is installed.
        echo Please reinstall Node.js from https://nodejs.org/
        pause
    )
) else (
    echo [ERROR] Node.js is NOT installed!
    echo.
    echo ========================================
    echo INSTALLATION REQUIRED
    echo ========================================
    echo.
    echo Please install Node.js first:
    echo.
    echo 1. Visit: https://nodejs.org/
    echo 2. Download the LTS version (Recommended)
    echo 3. Run the installer
    echo 4. Restart this script after installation
    echo.
    echo ========================================
    echo Would you like to open the download page?
    echo ========================================
    echo.
    choice /C YN /M "Open Node.js download page"
    if errorlevel 2 goto end
    if errorlevel 1 start https://nodejs.org/
    
    :end
    echo.
    echo After installing Node.js:
    echo 1. Close and reopen this window
    echo 2. Run this script again, OR
    echo 3. Run: npm install
    echo.
    pause
)



