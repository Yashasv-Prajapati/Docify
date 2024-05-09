import requests
import os
import json
#get the current working directory
cwd = os.getcwd()
# print(cwd)
with open("htmlcov/index.html", "r") as file:
    # Read the entire contents of the file into a string
    file_contents = file.read()

# will change later
API_ENDPOINT = "http://host.docker.internal:3000/api/md/coverage-to-md"

myobj = {"htmlStr": file_contents}

cookies = {"docify-user": "hello owo"}

x = requests.post(API_ENDPOINT, json=myobj, cookies=cookies)
#x.test is in json string
#convert to json object
obj=json.loads(x.text)
print(obj['markdown'])
