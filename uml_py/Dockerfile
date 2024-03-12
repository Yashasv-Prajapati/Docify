FROM ubuntu:22.04
WORKDIR /app
COPY . /app
RUN apt-get update 
RUN apt-get install -y python3 
RUN apt-get install -y python3-pip
RUN apt-get install -y git
RUN apt-get install -y graphviz
RUN pip3 install -r requirements.txt
RUN git config --global user.name "t05" 
# RUN git clone https://github.com/sarvo314/StepsByKnightVisualiser.git 
CMD python3 Docify-Combiner.py && pyreverse -ASmy .merged_py_file.py && dot -Tpng classes.dot -o ./.docify_assets/images/output.png && curl -H 'Content-Type: application/json' -d '{ "url":"./.docify_assets/images/output.png","authorId":"69", "projectId": 69}' -X PUT localhost:3000/api/uml/update 
