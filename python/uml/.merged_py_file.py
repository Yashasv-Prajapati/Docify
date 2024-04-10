# Content from: ./.merged_py_file.py


# Content from: ./Docify-Combiner.py
import os
FINAL = "."
def copy_py_files(directory, output_file):
    with open(output_file, 'w') as output:
        for root, _, files in os.walk(directory):
            for filename in sorted(files):
                if filename.endswith(".py") and filename != "Dockify-Combiner.py":
                    file_path = os.path.join(root, filename)
                    print(file_path)
                    with open(file_path, 'r') as file:
                        output.write("# Content from: {}\n".format(file_path))
                        output.write(file.read())
                        output.write("\n\n")
                        

                        
def list_folders_and_files():
    """
    Lists all folders and files in the current directory.
    """
    items = os.listdir()
    folders = [item for item in items if os.path.isdir(item)]
    files = [item for item in items if os.path.isfile(item)]
    return folders, files

def navigate():
    """
    Allows the user to navigate through folders and files.
    """
    global FINAL
    while True:
        print("\nCurrent Directory Contents:")
        folders, files = list_folders_and_files()
        print("Folders:")
        for folder in folders:
            print(folder + "/")
        print("\nFiles:")
        for file in files:
            print(file)
        
        choice = input("\nEnter folder or file name to navigate (or press Enter to exit): ")
        if choice == "":
            # return os.path.abspath(choice)
            break
        elif os.path.isdir(choice):
            os.chdir(choice)
        elif os.path.isfile(choice):
            return os.path.abspath(choice)
        else:
            print("Invalid choice. Please enter a valid folder or file name.")


def main():
    # source_directory = input("Enter directory name (. for current directory): \n") 
    output_file = ".merged_py_file.py"
    # source_directory = navigate()
    source_directory = "."

    copy_py_files(source_directory, output_file)
    print("All .py files copied to {}".format(output_file))

if __name__ == "__main__":
    main()


