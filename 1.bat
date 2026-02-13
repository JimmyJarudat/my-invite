@echo off
echo ========================================
echo Pre-Wedding Gallery - Setup Script
echo ========================================
echo.

echo [1/4] Creating folder structure...
if not exist "public\images\prewedding\original" mkdir "public\images\prewedding\original"
if not exist "public\images\prewedding\thumbnails" mkdir "public\images\prewedding\thumbnails"
echo ✓ Folders created

echo.
echo [2/4] Checking for images in original folder...
dir /b "public\images\prewedding\original\*.jpg" 2>nul | findstr "^" >nul
if %errorlevel% equ 0 (
    echo ✓ Found images in original folder
    echo.
    echo [3/4] Installing sharp (if needed)...
    call npm list sharp >nul 2>&1
    if %errorlevel% neq 0 (
        echo Installing sharp...
        call npm install sharp
    ) else (
        echo ✓ Sharp already installed
    )
    
    echo.
    echo [4/4] Optimizing images...
    node optimize-images.js
) else (
    echo.
    echo ⚠️  No images found!
    echo.
    echo Please add your Pre-Wedding photos to:
    echo   public\images\prewedding\original\
    echo.
    echo Supported formats: .jpg, .jpeg, .png, .webp
    echo.
    echo After adding images, run this script again:
    echo   setup-gallery.bat
)

echo.
echo ========================================
pause