# Auto-commit script for Branovis Forge Website
# Automatically commits and pushes changes to git

Write-Host "Checking for changes..." -ForegroundColor Cyan

# Check if there are changes
$status = git status --short
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No changes to commit." -ForegroundColor Yellow
    exit 0
}

# Get current branch
$branch = git branch --show-current
Write-Host "Current branch: $branch" -ForegroundColor Cyan

# Add all changes
Write-Host "Staging changes..." -ForegroundColor Cyan
git add .

# Create commit message with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "Auto-commit: Update at $timestamp"

# Check if there are staged changes
$staged = git diff --cached --name-only
if ([string]::IsNullOrWhiteSpace($staged)) {
    Write-Host "No staged changes to commit." -ForegroundColor Yellow
    exit 0
}

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Cyan
git commit -m $commitMessage

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Changes committed successfully" -ForegroundColor Green
    
    # Push to remote
    Write-Host "Pushing to remote repository..." -ForegroundColor Cyan
    git push origin $branch
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Changes pushed successfully to origin/$branch" -ForegroundColor Green
    } else {
        Write-Host "✗ Error pushing to remote" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✗ Error committing changes" -ForegroundColor Red
    exit 1
}


