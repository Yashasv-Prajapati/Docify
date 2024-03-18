#!/bin/bash

# Check if the project directory argument is provided
if [ $# -eq 0 ]; then
  echo "Usage: $0 <project_directory>"
  echo "Relative path of project directory not specified"
  exit 1
fi

# Relative path of the project directory
relative_path="$1"

# Convert relative path to absolute path
project_directory="$(realpath "$relative_path")"

# Change directory to the project directory
cd "$project_directory" || exit

# For testing locally, give permission to use this bash file using the command given below
# chmod +x python_code_coverage.sh

# Step 1: Build the project
./gradlew build

# Step 2: Run the tests to collect coverage data
./gradlew test

# Step 3: Generate JaCoCo report
./gradlew jacocoTestReport

# Navigation to index.html
jacoco_report_directory=$(find "$project_directory" -type d -name "jacoco")
cd "$jacoco_report_directory" || exit

# Find index.html and pass its absolute path to the Python script
index_html_path=$(find . -type f -name "index.html")
if [ -z "$index_html_path" ]; then
  echo "Error: index.html not found"
  exit 1
fi

# Run the Python script with the absolute path to index.html
python3 test_java.py "$index_html_path" >> README.md