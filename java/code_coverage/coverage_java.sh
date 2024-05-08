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

# Locate the JaCoCo report directory
jacoco_report_directory="$project_directory/build/reports/jacoco"
if [ ! -d "$jacoco_report_directory" ]; then
  echo "Error: JaCoCo report directory not found"
  exit 1
fi

# Navigate to the JaCoCo report directory
cd "$jacoco_report_directory" || exit

# Find index.html within the JaCoCo report directory
index_html_path="index.html"
if [ ! -f "$index_html_path" ]; then
  echo "Error: index.html not found in JaCoCo report directory"
  exit 1
fi

# Print the path to index.html (for debugging purposes)
echo "Found index.html at: $jacoco_report_directory/$index_html_path"

python3 coverage_readme_java.py "$jacoco_report_directory/$index_html_path" >> README.md