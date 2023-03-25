#!/bin/bash

# 在这个脚本中，我们使用 getopts 命令来解析命令行参数。我们使用 -d 选项来指定目录路径，并将其存储在 $dirPath 变量中。如果没有提供 -d 选项，则使用默认值 ./dev/plugins/tiddlywiki-tailwindcss。
# 然后，我们使用 if [ ! -d "$dirPath" ]、if [ ! -f "$inputPath" ] 和 if [ ! -d "$(dirname "$outputPath")" ] 来检查目录路径、输入文件和输出目录是否存在。如果它们不存在，我们会输出一条错误消息，并使用 exit 1 命令退出脚本。
# 最后，我们使用 npx tailwindcss 命令来处理 Tailwind CSS，并在处理完成后输出一条消息，指示生成的 CSS 文件路径。
# 在终端中，您可以使用以下命令来运行这个脚本：
# bash your-script.sh -d /path/to/directory
# 如果目录路径、输入文件或输出目录不存在，脚本将输出红色错误消息

while getopts ":d:" opt; do
  case ${opt} in
    d )
      dirPath=$OPTARG
      ;;
    \? )
      echo "Invalid option: -$OPTARG" 1>&2
      exit 1
      ;;
    : )
      echo "Invalid option: -$OPTARG requires an argument" 1>&2
      exit 1
      ;;
  esac
done
shift $((OPTIND -1))

dirPath=${dirPath:-"./plugins/oeyoews/tiddlywiki-tailwindcss"}
inputPath="$dirPath/files/index.css"
outputPath="$dirPath/files/styles.min.css"
outputPathDev="$dirPath/files/styles.dev.css"
# content=$(find ${dirPath} -type f \( -name "*.html" -o -name "*.css" -o -name "*.tid" \))
content="$dirPath/**/*"

if [ ! -d "$dirPath" ]
  then
    echo -e "\033[0;31mDirectory $dirPath does not exist\033[0m"
    echo "Please provide a valid directory path"
    exit 1
fi

if [ ! -f "$inputPath" ]
  then
    echo -e "\033[0;31mInput file $inputPath does not exist\033[0m"
    exit 1
fi

if [ ! -d "$(dirname "$outputPath")" ]
  then
    echo -e "\033[0;31mOutput directory $(dirname "$outputPath") does not exist\033[0m"
    exit 1
fi

# npx tailwindcss --input "$inputPath" --output "$outputPathDev" --content "$content"
# npx tailwindcss --input "$inputPath" --output "$outputPath" --minify --content "$content"
# npx tailwindcss --input "$inputPath" --output "$outputPathDev" -c ./tw-preset.js
# npx tailwindcss --input "$inputPath" --output "$outputPath" --minify -c ./tw-preset.js
npx tailwindcss --output "$outputPathDev" -c ./plugins/oeyoews/tiddlywiki-tailwindcss/files/tw-preset.js
npx tailwindcss --output "$outputPath" --minify -c ./plugins/oeyoews/tiddlywiki-tailwindcss/files/tw-preset.js

# watch
# npx tailwindcss --output ./plugins/oeyoews/tiddlywiki-tailwindcss/files/styles.min.css --minify -c ./tw-preset.js -w

size=$(wc -c "$outputPath" | awk '{print $1}')
if [ "$size" -lt "1024" ]; then
  sizeStr="${size} bytes"
elif [ "$size" -lt "1048576" ]; then
  sizeStr="$(echo "scale=2; $size/1024" | bc) KB"
else
  sizeStr="$(echo "scale=2; $size/1048576" | bc) MB"
fi
echo -e "\033[0;32mGenerated $outputPath (${sizeStr})\033[0m"

# update-documentaion
cd ./plugins/oeyoews/tiddlywiki-tailwindcss/files && node ./update-documentation.js
