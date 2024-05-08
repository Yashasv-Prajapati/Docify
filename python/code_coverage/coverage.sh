REPO_NAME=$1
cp test_python.py ../repo/$REPO_NAME
pip install -r requirements.txt
cd ..
cd repo
cd $REPO_NAME
#in the tests directory, this finds all the target test files.
pytest
coverage run -m pytest

# For outputing the report in the terminal
coverage report

#To get the result on the web
coverage html

python3 test_python.py  >> README.md

rm test_python.py