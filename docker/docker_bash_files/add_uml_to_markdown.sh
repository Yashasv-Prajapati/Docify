#!/bin/bash

# Function to update README.md with image link
update_readme_with_image() {
    local image_url="$1"
    printf "### UML Diagram\n" >> README.md
    printf "![alt-txt]($image_url)\n" >> README.md
}

main() {
    # Project directory path
    project_dir="$1"
    # Image file path relative to project directory
    image_url="$2"
    # Check if the project directory exists
    if [ ! -d "$project_dir" ]; then
        printf "Project directory '$project_dir' not found.\n"
    # Check if the image file exists
    elif [ ! -f "$project_dir/$image_url" ]; then
        printf "Image file '$image_url' not found.\n"
    else
        # Create a folder in the project directory to contain the image file
        cd "$project_dir" || exit
        # Update README.md with image link
        printf "Updating README.md with image link...\n"
        update_readme_with_image "$image_url"
    fi
}

main $1 $2