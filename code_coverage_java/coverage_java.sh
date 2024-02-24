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

# Optional: View the generated report
# You may want to open it in a browser
# Uncomment the next line if you want to automatically open the report
# xdg-open build/reports/jacoco/test/html/index.html  # For Linux
# start "" build\reports\jacoco\test\html\index.html  # For Windows