import os
import re

def extract_imports(file_path):
    """
    Extracts imported libraries from Java source code files.
    """
    libraries = set()
    with open(file_path, 'r') as file:
        for line in file:
            match = re.match(r'^\s*import\s+([\w.]+)', line)
            if match:
                library = match.group(1)
                libraries.add(library)
            else:
                match = re.match(r'^\s*import\s+\[\w+]\s+([\w.]+)', line) # import [static] statement
                if match:
                    library = match.group(1)
                    libraries.add(library)

    
    # print(libraries)
    return libraries

def extract_used_libraries(directory):
    """
    Extracts used libraries in Java files within the specified directory.
    """

    used_libraries = set()
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.java'):
                file_path = os.path.join(root, file)
                imported_libraries = extract_imports(file_path)
                with open(file_path, 'r') as java_file:
                    for lib in imported_libraries:
                        found=0
                        for line in java_file:
                            if re.match(r'^import', line):
                                print('import matched')
                                continue
                            # elif re.search(r'\b{}\b'.format(re.escape(lib)), line):
                            if re.search(r'\b'+re.escape(lib)+r'\b', line):
                                print(lib)
                                used_libraries.add(lib)
                                break
    return used_libraries

def main():
    java_directory = input("Enter the relative path to the directory containing Java files: ")
    used_libraries = extract_used_libraries(java_directory)
    print("Libraries being used in the Java files:")
    for lib in used_libraries:
        print(lib)

if __name__ == "__main__":
    main()