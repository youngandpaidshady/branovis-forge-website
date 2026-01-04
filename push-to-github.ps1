# PowerShell script to push to GitHub
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual GitHub details

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername,
    
    [Parameter(Mandatory=$true)]
    [string]$RepoName
)

$remoteUrl = "https://github.com/$GitHubUsername/$RepoName.git"

Write-Host "Setting up remote repository..." -ForegroundColor Cyan
git remote add origin $remoteUrl

Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push -u origin main

Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://www.netlify.com" -ForegroundColor White
Write-Host "2. Sign up/Login and connect your GitHub account" -ForegroundColor White
Write-Host "3. Click 'Add new site' → 'Import an existing project'" -ForegroundColor White
Write-Host "4. Select your repository: $RepoName" -ForegroundColor White
Write-Host "5. Netlify will auto-detect build settings from netlify.toml" -ForegroundColor White
Write-Host "6. Click 'Deploy site' and wait for deployment!" -ForegroundColor White

