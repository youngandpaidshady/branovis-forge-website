# Scrape project images from Vermont Construction Company projects page
$url = "https://www.vermontconstructioncompany.com/projects"
$imgDir = "img\projects"

# Ensure directory exists
if (-not (Test-Path $imgDir)) {
    New-Item -ItemType Directory -Path $imgDir -Force | Out-Null
}

try {
    Write-Host "Fetching page HTML..." -ForegroundColor Cyan
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -ErrorAction Stop
    $html = $response.Content
    
    # Extract image URLs from img tags
    $imgMatches = [regex]::Matches($html, '<img[^>]+src=["\']([^"\']+)["\'][^>]*>', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
    
    $projectNames = @('Farmhouse Kitchen Renovation', 'Williston Bathroom Remodel', 'Charlotte Library Addition', 'Burlington Kitchen Remodel')
    $downloadedCount = 0
    
    foreach ($match in $imgMatches) {
        $imgSrc = $match.Groups[1].Value
        
        # Check if it's a project-related image
        foreach ($projName in $projectNames) {
            $slug = $projName -replace ' ', '-' -replace '([A-Z])', '$1' -replace '([a-z])([A-Z])', '$1-$2'
            $slug = $slug.ToLower()
            
            if ($imgSrc -match $slug -or $imgSrc -match 'project' -or $imgSrc -match 'kitchen' -or $imgSrc -match 'bathroom' -or $imgSrc -match 'library') {
                # Construct full URL if relative
                if ($imgSrc -notmatch '^https?://') {
                    if ($imgSrc.StartsWith('/')) {
                        $imgSrc = "https://www.vermontconstructioncompany.com$imgSrc"
                    } else {
                        $imgSrc = "https://www.vermontconstructioncompany.com/$imgSrc"
                    }
                }
                
                # Extract filename
                $filename = "scraped_$slug.jpg"
                $filepath = Join-Path $imgDir $filename
                
                try {
                    Write-Host "Downloading: $imgSrc" -ForegroundColor Yellow
                    $imgResponse = Invoke-WebRequest -Uri $imgSrc -UseBasicParsing -ErrorAction Stop
                    if ($imgResponse.StatusCode -eq 200) {
                        [System.IO.File]::WriteAllBytes($filepath, $imgResponse.Content)
                        Write-Host "✅ Saved: $filename" -ForegroundColor Green
                        $downloadedCount++
                    }
                } catch {
                    Write-Host "⚠️  Failed to download: $imgSrc" -ForegroundColor Red
                }
                
                break
            }
        }
    }
    
    Write-Host "`n✅ Downloaded $downloadedCount images" -ForegroundColor Green
    
} catch {
    Write-Host "Error fetching page: $_" -ForegroundColor Red
    Write-Host "Creating placeholder structure..." -ForegroundColor Yellow
    
    # Create placeholder structure
    $projects = @(
        'farmhouse-kitchen-renovation',
        'williston-bathroom-remodel',
        'charlotte-library-addition',
        'burlington-kitchen-remodel'
    )
    
    foreach ($proj in $projects) {
        $filepath = Join-Path $imgDir "scraped_$proj.txt"
        Set-Content -Path $filepath -Value "Placeholder for $proj - Image URL needs to be manually added"
    }
}

