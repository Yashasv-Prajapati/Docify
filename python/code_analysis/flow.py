# import ast
# import os

# def extract_function_calls(filename):
#     function_calls = {}
#     imports = set()

#     with open(filename, 'r') as file:
#         tree = ast.parse(file.read(), filename=filename)

#     for node in ast.walk(tree):
#         if isinstance(node, ast.FunctionDef):
#             function_calls[node.name] = []

#         if isinstance(node, ast.Import):
#             for alias in node.names:
#                 imports.add(alias.name)

#         if isinstance(node, ast.ImportFrom):
#             module_name = node.module
#             for alias in node.names:
#                 imports.add(f"{module_name}.{alias.name}")

#     for node in ast.walk(tree):
#         if isinstance(node, ast.Call):
#             if isinstance(node.func, ast.Name):
#                 if node.func.id in function_calls:
#                     function_calls[node.func.id].append((node.func.id, filename))
#                 elif node.func.id in imports:
#                     function_calls[node.func.id] = [(node.func.id, filename)]

#     print(f"Imports: {imports}")
#     return function_calls

# def analyze_code_flow(start_file):
#     visited_files = set()
#     call_stack = [("main", start_file)]
#     while call_stack:
#         function_name, filename = call_stack.pop()
#         if filename in visited_files:
#             continue
#         visited_files.add(filename)
#         print(f"From {filename} calling {function_name}")
#         function_calls = extract_function_calls(filename)
#         for next_function, next_filename in function_calls.get(function_name, []):
#             call_stack.append((next_function, next_filename))

# if __name__ == "__main__":
#     start_file = "main.py"  # Change this to your starting Python file
#     analyze_code_flow(start_file)

import ast
import os

def extract_function_calls(filename):
    function_calls = {}
    imports = set()

    with open(filename, 'r') as file:
        tree = ast.parse(file.read(), filename=filename)

    for node in ast.walk(tree):
        if isinstance(node, ast.FunctionDef):
            function_calls[node.name] = []

        if isinstance(node, ast.Import):
            for alias in node.names:
                imports.add(alias.name)

        if isinstance(node, ast.ImportFrom):
            module_name = node.module
            for alias in node.names:
                imports.add(f"{module_name}.{alias.name}")

    for node in ast.walk(tree):
        if isinstance(node, ast.Call):
            if isinstance(node.func, ast.Name):
                if node.func.id in function_calls:
                    function_calls[node.func.id].append((node.func.id, filename))
                elif node.func.id in imports:
                    function_calls[node.func.id] = [(node.func.id, filename)]

    return function_calls

def analyze_code_flow(start_file):
    visited_files = set()
    call_stack = [("main", start_file)]
    while call_stack:
        function_name, filename = call_stack.pop()
        if filename in visited_files:
            continue
        visited_files.add(filename)
        print(f"From {filename} calling {function_name}")
        function_calls = extract_function_calls(filename)
        for next_function, next_filename in function_calls.get(function_name, []):
            call_stack.append((next_function, next_filename))

if __name__ == "__main__":
    start_directory = "."  
    for root, dirs, files in os.walk(start_directory):
        for file in files:
            if file.endswith(".py"):
                analyze_code_flow(os.path.join(root, file))

