REPO_NAME=$1
cp Docify-Combiner.py ../repo/$REPO_NAME
pip install -r requirements.txt
cd ..
cd repo
cd $REPO_NAME
#in the tests directory, this finds all the target test files.
python3 Docify-Combiner.py
pyreverse -ASmy .merged_py_file.py
mkdir -p .docify-assets
apt-get install -y graphviz
dot -Tpng classes.dot -o ./.docify-assets/output.png
# curl -H 'Content-Type: application/json' -d '{ "url":"./.docify-assets/output.png","authorId":"69", "projectId": 69}' -X PUT http://host.docker.internal:3000/api/uml/update 
rm Docify-Combiner.py