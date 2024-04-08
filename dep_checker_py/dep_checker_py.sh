#!/bin/bash

# Check if a directory path is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <path_to_python_project_directory>"
    exit 1
fi

path_to_directory="$1" # Path to the Python project directory
temp_dir=$(mktemp -d -t dependency-checker-XXXXXX) # Create a temporary directory

echo "Temporary directory created at: $temp_dir"

# Step 1: Create and activate a temporary virtual environment within the temporary directory
python3 -m venv "$temp_dir/env"
source "$temp_dir/env/bin/activate"

# Step 2: Install pipreqs and pipdeptree in the temporary environment
pip install pipreqs pipdeptree

# Step 3: Use pipreqs to generate a requirements.txt file for direct imports from the project
pipreqs "$path_to_directory" --force --savepath "$temp_dir/requirements_direct.txt"
echo "Direct requirements identified and saved."

# Step 4: Install the directly imported packages into the temporary environment
pip install -r "$temp_dir/requirements_direct.txt"
echo "Direct requirements installed."

# Step 5: Use pipdeptree to analyze and list the dependencies of installed packages
pipdeptree --warn silence --freeze --output-file "$temp_dir/requirements_full.txt"
echo "Full dependency list generated."

# Step 6: Optional - Clean the requirements list if needed
# This step is placeholder for any additional processing you might want to perform
# For example, removing specific lines, filtering out unnecessary packages, etc.

# Step 7: Copy the final list of requirements back to the project directory or a specific location
cp "$temp_dir/requirements_full.txt" "./final_requirements.txt"
echo "Final requirements list copied to the current directory."

# Cleanup
deactivate
rm -rf "$temp_dir"
echo "Cleanup complete."

