
    #!/bin/bash

# Get the arguments
filename=$1
function_name=$2

# Create the Python file
cat << EOF > flow.py
import sys
import $filename

def trace_calls(frame, event, arg):
    if event == 'call':
        co = frame.f_code
        func_name = co.co_name
        filename = co.co_filename
        line_no = frame.f_lineno

        with open('trace.txt', 'a') as file:
            if(func_name != "docify_flow"):
                file.write(f"Call to {func_name} of {filename}\n")
    return trace_calls

def docify_flow():
    #  = sys.argv[1]
    $filename.$function_name()

sys.settrace(trace_calls)

if(__name__ == "__main__"):
    docify_flow()
EOF