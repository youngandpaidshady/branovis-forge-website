@echo off
echo ========================================
echo Branovis Forge - Git Setup & Deploy
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/downloads
    pause
    exit /b 1
)

echo [1/5] Initializing Git repository...
git init

echo.
echo [2/5] Adding all files to Git...
git add .

echo.
echo [3/5] Creating initial commit...
git commit -m "Initial commit: Branovis Forge website with SEO and mobile optimizations"

echo.
echo [4/5] Setting default branch to main...
git branch -M main

echo.
echo ========================================
echo Git setup complete!
echo ========================================
echo.
echo NEXT STEPS:
echo.
echo 1. Create a repository on GitHub:
echo    - Go to https://github.com/new
echo    - Name it: branovis-forge-website
echo    - DO NOT initialize with README
echo    - Click "Create repository"
echo.
echo 2. Connect and push:
echo    git remote add origin https://github.com/YOUR_USERNAME/branovis-forge-website.git
echo    git push -u origin main
echo.
echo 3. Deploy to Netlify:
echo    - Go to https://app.netlify.com
echo    - Click "Add new site" ^> "Import an existing project"
echo    - Connect to GitHub and select your repository
echo    - Build command: npm run build
echo    - Publish directory: dist
echo    - Click "Deploy site"
echo.
echo For detailed instructions, see DEPLOY.md
echo.
pause

