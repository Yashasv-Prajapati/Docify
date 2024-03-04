#!/bin/bash

# Function to generate a unique folder name
generate_folder_name() {
    date +"%Y%m%d%H%M%S"
}

# Function to update README.md with image link
update_readme_with_image() {
    local image_url="$1"
    printf "### UML Diagram\n" >> README.md
    printf "![uml_diagram]($image_url)\n" >> README.md
}

main() {
    project_dir="$1"
    image_url="$2"
    # Check if the project directory exists
    if [ ! -d "$project_dir" ]; then
        printf "Project directory '$project_dir' not found.\n"
    # Check if the image file exists
    elif [ ! -f "$image_url" ]; then
        printf "Image file '$image_url' not found.\n"
    else
        # Create a folder in the project directory to contain the image file
        cd "$project_dir" || exit
        folder_name=$(generate_folder_name)
        printf "Creating a folder named '$folder_name' in project directory...\n"
        mkdir "$folder_name"
        # Copy the image file to the folder
        printf "Copying image file to '$folder_name'...\n"
        cp "../$image_url" "$folder_name"
        # Update README.md with image link
        printf "Updating README.md with image link...\n"
        update_readme_with_image "$folder_name/output.png"
    fi
}

main $1 $2