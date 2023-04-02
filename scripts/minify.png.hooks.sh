#!/bin/sh

# Check for new or modified PNG files
for file in $(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(png)$')
do
  # Compress the PNG file using pngquant
  pngquant --force --ext .png --quality=60-80 "$file"
done
