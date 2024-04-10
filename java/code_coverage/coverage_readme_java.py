import sys
import requests

# Check if the correct number of command-line arguments are provided
if len(sys.argv) != 2:
    print("Usage: python3 test_python.py path not found")
    sys.exit(1)

# Get the absolute path to index.html from command-line argument
index_html_path = sys.argv[1]

# Open index.html file
try:
    with open(index_html_path, 'r') as file:
        # Read the entire contents of the file into a string
        file_contents = file.read()
except FileNotFoundError:
    print("Error: index.html file not found")
    sys.exit(1)

# Define the API endpoint
API_ENDPOINT = "http://localhost:3000/api/md/coverage-to-md"

# Prepare data to be sent to the API
myobj = {'htmlStr': file_contents}

# Send POST request to the API
try:
    x = requests.post(API_ENDPOINT, json=myobj)
    print(x.text)
except requests.exceptions.RequestException as e:
    print("Error:", e)
    sys.exit(1)