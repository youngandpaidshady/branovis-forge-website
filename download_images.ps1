# Download project images from Vermont Construction Company
$projects = @(
    @{Name='Farmhouse-Kitchen-Renovation'; Slug='farmhouse-kitchen-renovation'},
    @{Name='Williston-Bathroom-Remodel'; Slug='williston-bathroom-remodel'},
    @{Name='Charlotte-Library-Addition'; Slug='charlotte-library-addition'},
    @{Name='Burlington-Kitchen-Remodel'; Slug='burlington-kitchen-remodel'}
)

$baseUrl = 'https://www.vermontconstructioncompany.com'
$imgDir = 'img\projects'

# Ensure directory exists
if (-not (Test-Path $imgDir)) {
    New-Item -ItemType Directory -Path $imgDir -Force | Out-Null
}

foreach ($project in $projects) {
    $filename = "scraped_$($project.Slug).jpg"
    $filepath = Join-Path $imgDir $filename
    
    # Try common image URL patterns
    $imageUrls = @(
        "$baseUrl/wp-content/uploads/$($project.Slug).jpg",
        "$baseUrl/images/$($project.Slug).jpg",
        "$baseUrl/projects/$($project.Slug).jpg",
        "$baseUrl/assets/$($project.Slug).jpg"
    )
    
    $downloaded = $false
    foreach ($url in $imageUrls) {
        try {
            Write-Host "Trying: $url" -ForegroundColor Yellow
            $response = Invoke-WebRequest -Uri $url -UseBasicParsing -ErrorAction Stop
            if ($response.StatusCode -eq 200 -and $response.Headers['Content-Type'] -like '*image*') {
                [System.IO.File]::WriteAllBytes($filepath, $response.Content)
                Write-Host "✅ Downloaded: $filename" -ForegroundColor Green
                $downloaded = $true
                break
            }
        } catch {
            # Continue to next URL
        }
    }
    
    if (-not $downloaded) {
        Write-Host "⚠️  Could not download image for: $($project.Name)" -ForegroundColor Red
        Write-Host "   Creating placeholder..." -ForegroundColor Yellow
        # Create a placeholder file
        $placeholder = "Placeholder image for $($project.Name)"
        Set-Content -Path ($filepath -replace '\.jpg$', '.txt') -Value $placeholder
    }
}

Write-Host "`n✅ Image download process completed!" -ForegroundColor Green

