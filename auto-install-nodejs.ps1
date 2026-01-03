# PowerShell script to automatically install Node.js and complete setup
# Run: powershell -ExecutionPolicy Bypass -File auto-install-nodejs.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Branovis Forge - Auto Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is already installed
$nodeInstalled = $false
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "[SUCCESS] Node.js is already installed: $nodeVersion" -ForegroundColor Green
        $nodeInstalled = $true
    }
} catch {
    $nodeInstalled = $false
}

# If Node.js is not installed, try to install it
if (-not $nodeInstalled) {
    Write-Host "[INFO] Node.js not found. Attempting to install..." -ForegroundColor Yellow
    Write-Host ""
    
    # Try Winget first (Windows Package Manager)
    $wingetAvailable = $false
    try {
        $wingetVersion = winget --version 2>$null
        if ($wingetVersion) {
            Write-Host "[INFO] Winget found. Installing Node.js LTS via Winget..." -ForegroundColor Yellow
            Write-Host "This may take a few minutes..." -ForegroundColor Yellow
            Write-Host ""
            
            winget install --id OpenJS.NodeJS.LTS --silent --accept-package-agreements --accept-source-agreements
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[SUCCESS] Node.js installed via Winget!" -ForegroundColor Green
                Write-Host "[INFO] Refreshing environment variables..." -ForegroundColor Yellow
                
                # Refresh PATH
                $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
                
                # Wait a moment for installation to complete
                Start-Sleep -Seconds 3
                
                # Verify installation
                try {
                    $nodeVersion = node --version 2>$null
                    if ($nodeVersion) {
                        Write-Host "[SUCCESS] Node.js verified: $nodeVersion" -ForegroundColor Green
                        $nodeInstalled = $true
                    }
                } catch {
                    Write-Host "[WARNING] Node.js installed but not yet in PATH. Please restart terminal." -ForegroundColor Yellow
                }
            } else {
                Write-Host "[INFO] Winget installation failed or requires elevation." -ForegroundColor Yellow
            }
            $wingetAvailable = $true
        }
    } catch {
        $wingetAvailable = $false
    }
    
    # If Winget didn't work, try Chocolatey
    if (-not $nodeInstalled -and -not $wingetAvailable) {
        try {
            $chocoVersion = choco --version 2>$null
            if ($chocoVersion) {
                Write-Host "[INFO] Chocolatey found. Installing Node.js LTS via Chocolatey..." -ForegroundColor Yellow
                Write-Host "This may take a few minutes..." -ForegroundColor Yellow
                Write-Host ""
                
                choco install nodejs-lts -y
                
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "[SUCCESS] Node.js installed via Chocolatey!" -ForegroundColor Green
                    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
                    Start-Sleep -Seconds 3
                    
                    try {
                        $nodeVersion = node --version 2>$null
                        if ($nodeVersion) {
                            Write-Host "[SUCCESS] Node.js verified: $nodeVersion" -ForegroundColor Green
                            $nodeInstalled = $true
                        }
                    } catch {
                        Write-Host "[WARNING] Node.js installed but not yet in PATH. Please restart terminal." -ForegroundColor Yellow
                    }
                }
            }
        } catch {
            # Chocolatey not available
        }
    }
    
    # If still not installed, provide manual instructions
    if (-not $nodeInstalled) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Red
        Write-Host "MANUAL INSTALLATION REQUIRED" -ForegroundColor Red
        Write-Host "========================================" -ForegroundColor Red
        Write-Host ""
        Write-Host "Could not automatically install Node.js." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Please install manually:" -ForegroundColor Yellow
        Write-Host "1. Visit: https://nodejs.org/" -ForegroundColor White
        Write-Host "2. Download the LTS version" -ForegroundColor White
        Write-Host "3. Run the installer" -ForegroundColor White
        Write-Host "4. Restart this script or run: npm install" -ForegroundColor White
        Write-Host ""
        
        # Open download page
        Write-Host "Opening Node.js download page..." -ForegroundColor Cyan
        Start-Process "https://nodejs.org/"
        
        exit 1
    }
}

# Verify npm is available
Write-Host ""
Write-Host "[INFO] Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Write-Host "[SUCCESS] npm found: $npmVersion" -ForegroundColor Green
    } else {
        Write-Host "[ERROR] npm not found. Please reinstall Node.js." -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "[ERROR] npm not found. Please reinstall Node.js." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Installing Project Dependencies" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This may take a few minutes..." -ForegroundColor Yellow
Write-Host ""

npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "[ERROR] Installation failed!" -ForegroundColor Red
    Write-Host "Try running: npm install --legacy-peer-deps" -ForegroundColor Yellow
    exit 1
}

# Verify setup
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Verifying Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

node verify-setup.js

# Success message
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "✅ SETUP COMPLETE!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Available commands:" -ForegroundColor Cyan
Write-Host "  npm run dev     - Start development server" -ForegroundColor White
Write-Host "  npm run build   - Build for production" -ForegroundColor White
Write-Host "  npm run preview - Preview production build" -ForegroundColor White
Write-Host ""
Write-Host "Starting development server..." -ForegroundColor Cyan
Write-Host ""

npm run dev



