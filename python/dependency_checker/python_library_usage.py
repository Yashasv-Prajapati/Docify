import os
import ast

def extract_dependencies(file_path):
    """
    Extracts dependencies from Python source code files.
    """
    dependencies = set()
    with open(file_path, 'r') as file:
        tree = ast.parse(file.read(), filename=file_path)
        for node in ast.walk(tree):
            if isinstance(node, ast.Import):
                for alias in node.names:
                    dependencies.add(alias.name)
            elif isinstance(node, ast.ImportFrom):
                dependencies.add(node.module)
    return dependencies

def check_dependencies(directory, output_file):
    """
    Checks dependencies in Python files within the specified directory and writes them to a text file.
    """
    with open(output_file, 'w') as output:
        for root, dirs, files in os.walk(directory):
            for file in files:
                if file.endswith('.py'):
                    file_path = os.path.join(root, file)
                    dependencies = extract_dependencies(file_path)
                    output.write(f"Dependencies for {file_path}: ")
                    if dependencies:
                        output.write(f"{dependencies}\n")
                    else:
                        output.write("None\n")

#results stored in py_dependencies.txt
                        
def main():
    python_directory = input("Enter the relative path to the directory containing Python files: ")
    output_file = "py_dependencies.txt"
    if not os.path.exists(python_directory):
        print("Directory does not exist.")
        return
    check_dependencies(python_directory, output_file)
    print(f"Dependencies written to {output_file}")

if __name__ == "__main__":
    main()

#Testing
#py_dependencies.txt generated for uml_py