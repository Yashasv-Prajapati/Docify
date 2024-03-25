#!/bin/bash

#if not already installed
pip install pipreqs
pip install pip-tools

# Define the directory path
path_to_directory="/Users/aryamangupta/Desktop/GitHub/test" #Use the next line while integration, currently given dummy path
# path_to_directory="$1"

# Step 1: Generate requirements.txt using pipreqs
pipreqs "$path_to_directory"

# Step 2: Create and activate a temporary virtual environment
python3 -m venv temp_env
source temp_env/bin/activate

#Install the modules and libraries listed by pipreqs into the temporary environment
pip install -r "$path_to_directory/requirements.txt"

#Get a list of all installed packages and their dependencies using pip freeze
pip freeze > all_dependencies.txt

#Merge the outputs to form the final requirements.txt
cat "$path_to_directory/requirements.txt" all_dependencies.txt | sort | uniq > merged_requirements.txt

# Removes redundancies 
pip-compile --output-file requirements.txt merged_requirements.txt
grep -v '^[ ]*#' requirements.txt > tmpfile && mv tmpfile requirements.txt

#Delete requirements.txt, all_dependencies.txt
rm "$path_to_directory/requirements.txt" all_dependencies.txt merged_requirements.txt

#Deactivate and delete the temporary virtual environment
deactivate
rm -rf temp_env