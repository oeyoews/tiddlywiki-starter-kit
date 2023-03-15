#!/bin/bash

if [ -z "$1" ]
  then
    read -p "Please provide a directory path: " dirPath
    dirPath=${dirPath:-"./dev/plugins/tiddlywiki-tailwindcss"}
else
    dirPath="$1"
fi

if [ ! -d "$dirPath" ]
  then
    echo -e "\033[0;31mDirectory $dirPath does not exist\033[0m"
    echo "Please provide a valid directory path"
    exit 1
fi

inputPath="$dirPath/files/styles.css"
outputPath="$dirPath/files/styles.min.css"
content="$dirPath/**/*.tid"

npx tailwindcss --input "$inputPath" --output "$outputPath" --minify --content "$content"

echo -e "\033[0;32mGenerated $outputPath\033[0m"
