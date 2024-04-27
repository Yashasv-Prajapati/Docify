#!/bin/bash

path_to_directory="../repo/$1"

javac LibraryAnalyzer.java

if [ $? -eq 0 ]; then
    echo "Compilation successful. Running LibraryAnalyzer..."
    
    # Run Java program with command line arguments
    java LibraryAnalyzer $path_to_directory
else
    echo "Compilation failed. Exiting."
fi

