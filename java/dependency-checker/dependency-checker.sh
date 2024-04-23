#!/bin/bash

path_to_directory="$1"

javac LibraryAnalyzer.java

if [ $? -eq 0 ]; then
    echo "Compilation successful. Running LibraryAnalyzer..."
    
    # Run Java program with command line arguments
    java LibraryAnalyzer "$1"
else
    echo "Compilation failed. Exiting."
fi

