$sourceDir = "C:\Users\ebine\.gemini\antigravity\brain\753da055-c1f4-49eb-92a7-9979f4b00133"
$destDir = "C:\Users\ebine\perfume\screenshots"

Write-Host "Saving Project Overview Screenshots..." -ForegroundColor Cyan

# 1. Create screenshots directory
try {
    if (-not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        Write-Host "Created directory: $destDir" -ForegroundColor Green
    }
}
catch {
    Write-Host "Error creating directory: $_" -ForegroundColor Red
    exit 1
}

# 2. Image Mapping
$images = @(
    @{ Src = "uploaded_image_0_1768736514202.png"; Dest = "home-hero.png" },
    @{ Src = "uploaded_image_1_1768736514202.png"; Dest = "products-grid.png" },
    @{ Src = "uploaded_image_2_1768736514202.png"; Dest = "footer-section.png" }
)

# 3. Copy Loop
foreach ($img in $images) {
    $srcPath = Join-Path $sourceDir $img.Src
    $destPath = Join-Path $destDir $img.Dest
    
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination $destPath -Force
        Write-Host "✅ Saved" -NoNewline
        Write-Host " $($img.Dest) " -ForegroundColor Yellow
    }
    else {
        Write-Host "❌ Source not found: $srcPath" -ForegroundColor Red
    }
}

Write-Host "`n🎉 Screenshots saved! You can now commit them to GitHub." -ForegroundColor Green
