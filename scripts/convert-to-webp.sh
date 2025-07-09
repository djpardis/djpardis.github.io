#!/bin/bash

# Script to convert JPG and PNG images to WebP format
# Requires cwebp (from webp package) to be installed

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "Error: cwebp is not installed. Please install it using:"
    echo "  brew install webp"
    exit 1
fi

# Directory containing images
IMAGE_DIR="../files/pics"

# Quality setting for WebP conversion (0-100)
QUALITY=80

# Find all JPG and PNG files in the directory
find "$IMAGE_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | while read -r img; do
    # Get the base name without extension
    base="${img%.*}"
    
    # Create WebP filename
    webp_file="${base}.webp"
    
    # Convert to WebP if WebP version doesn't exist or is older than original
    if [ ! -f "$webp_file" ] || [ "$img" -nt "$webp_file" ]; then
        echo "Converting: $img to $webp_file"
        cwebp -q $QUALITY "$img" -o "$webp_file"
    else
        echo "Skipping: $webp_file already exists and is up to date"
    fi
done

echo "Conversion complete!"
