#!/bin/bash

# File names
coverage_file="COVERAGE.md"
readme_file=""

# Check if README.md exists
if [ -f "README.md" ]; then
    readme_file="README.md"
elif [ -f "Readme.md" ]; then
    readme_file="Readme.md"
else
    readme_file="README.md"  # Default to creating README.md if none exist
fi

# Check if COVERAGE.md exists
if [ ! -f "$coverage_file" ]; then
    echo "Error: $coverage_file does not exist."
    exit 1
fi

# Append or create README.md with the content of COVERAGE.md
if [ -n "$readme_file" ]; then
    cat "$coverage_file" >> "$readme_file"
    echo "Appended contents of $coverage_file to $readme_file"
else
    cp "$coverage_file" "$readme_file"
    echo "Created $readme_file with contents of $coverage_file"
fi
