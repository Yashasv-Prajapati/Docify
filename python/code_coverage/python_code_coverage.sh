#!/bin/bash

# For testing locally, give permission to use this bash file using the command given below
# chmod +x python_code_coverage.sh

pip install -r requirements.txt
#in the tests directory, this finds all the target test files.
pytest
coverage run -m pytest

# For outputing the report in the terminal
coverage report

#To get the result on the web
coverage html

python3 test_python.py >> README.md