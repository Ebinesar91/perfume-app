# Robust Image Copy Script
$sourceDir = "C:\Users\ebine\.gemini\antigravity\brain\753da055-c1f4-49eb-92a7-9979f4b00133"
$destDir = "C:\Users\ebine\perfume\frontend\public\assets"

Write-Host "Started Image Setup..." -ForegroundColor Cyan

# 1. Create destination directory
try {
    if (-not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        Write-Host "Created directory: $destDir" -ForegroundColor Green
    }
    else {
        Write-Host "Directory exists: $destDir" -ForegroundColor Gray
    }
}
catch {
    Write-Host "Error creating directory: $_" -ForegroundColor Red
    exit 1
}

# 2. Image Mapping
$images = @(
    @{ Src = "uploaded_image_0_1768734771148.png"; Dest = "hero-1.png" },
    @{ Src = "uploaded_image_1_1768734771148.png"; Dest = "hero-2.png" },
    @{ Src = "uploaded_image_2_1768734771148.jpg"; Dest = "hero-3.jpg" }
)

# 3. Copy Loop
foreach ($img in $images) {
    $srcPath = Join-Path $sourceDir $img.Src
    $destPath = Join-Path $destDir $img.Dest
    
    if (Test-Path $srcPath) {
        Copy-Item -Path $srcPath -Destination $destPath -Force
        Write-Host "✅ Copied" -NoNewline
        Write-Host " $($img.Src) " -ForegroundColor Yellow -NoNewline
        Write-Host "to" -NoNewline
        Write-Host " $($img.Dest)" -ForegroundColor Cyan
    }
    else {
        Write-Host "❌ Source file not found: $srcPath" -ForegroundColor Red
        # Check if maybe the user uploaded them with different names?
        # Listing source dir might help debugging mentally, but let's stick to the plan.
    }
}

Write-Host "`n🎉 Setup complete. Verify that files exist in: $destDir" -ForegroundColor Green
Write-Host "If the browser doesn't update, try refreshing properly (Ctrl+R)." -ForegroundColor Gray
