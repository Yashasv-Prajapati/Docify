#!/bin/bash

#if not already installed
pip install pipreqs
pip install pip-tools

# Define the directory path
path_to_directory="$1"
new_folder_path=".test_docify"  # Change this to your desired new folder path

# Step 1: Create a new folder
cd "../repo/$path_to_directory"
mkdir "$new_folder_path"

# Step 2: Copy only Python files from the directory to the new folder
find . -name "*.py" -exec cp {} "$new_folder_path" \;

# Step 3: Generate requirements.txt using pipreqs
pipreqs "$new_folder_path"
cat "$new_folder_path/requirements.txt"

# Step 4: Create and activate a temporary virtual environment
python3 -m venv temp_env
source temp_env/bin/activate && pip install -r "$new_folder_path/requirements.txt"

# Install the modules and libraries listed by pipreqs into the temporary environment

# Get a list of all installed packages and their dependencies using pip freeze
pip freeze > all_dependencies.txt

# Merge the outputs to form the final requirements.txt
cat "$new_folder_path/requirements.txt" all_dependencies.txt | sort | uniq > merged_requirements.txt

mkdir .docify-assets

# Remove redundancies
pip-compile --output-file requirements.txt merged_requirements.txt
grep -v '^[ ]*#' requirements.txt > .docify-assets/requirements.txt

# Delete requirements.txt, all_dependencies.txt
rm "$new_folder_path/requirements.txt" all_dependencies.txt requirements.txt merged_requirements.txt

# Deactivate and delete the temporary virtual environment
deactivate
rm -rf temp_env
rm -rf .test_docify
