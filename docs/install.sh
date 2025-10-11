#!/bin/bash

# 检测依赖
check_dependencies() {
  # echo "Checking dependencies: node, npm, git..."
  for cmd in node npm git; do
    if ! command -v $cmd &> /dev/null; then
      echo "Error: $cmd is not installed. Please install it and try again."
      exit 1
    fi
  done
  # echo "All dependencies are installed."
}

# 克隆仓库
clone_repository() {
  read -p "Please enter the directory name for the cloned repository: " dir_name
  if [ -d "$dir_name" ]; then
    echo "Error: Directory '$dir_name' already exists. Please choose another name."
    exit 1
  fi
  git clone --depth 1 http://github.com/oeyoews/neotw "$dir_name"
	if [ -d "$dir_name" ]; then
   prompt_npm_install
	else
		echo "Error: Failed to clone repository. Please check the repository URL and try again."
	fi

  # read -p "Please enter the repository URL to clone: " repo_url
  # if git clone "$repo_url" "$dir_name"; then
  #   echo "Repository successfully cloned into '$dir_name'."
  # else
  #   echo "Error: Failed to clone repository. Please check the repository URL and try again."
  #   exit 1
  # fi
}

# 提示安装依赖
prompt_npm_install() {
  echo "To install dependencies, run the following commands:"
  echo "cd $dir_name"
  echo "npm install"
}

# 主逻辑
main() {
  check_dependencies
  clone_repository
}

# 执行脚本
main
