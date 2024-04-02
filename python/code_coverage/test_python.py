import requests

with open('htmlcov/index.html', 'r') as file:
    # Read the entire contents of the file into a string
    file_contents = file.read()

# will change later
API_ENDPOINT="http://host.docker.internal:3000/api/md/coverage-to-md"

myobj = {'htmlStr': file_contents}

x = requests.post(API_ENDPOINT, json = myobj)

print(x.text)