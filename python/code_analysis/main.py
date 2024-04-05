from utils import print_hello
from math_functions import add, subtract
import traceback
import sys

def main():
    print_hello()
    result_add = add(5, 3)
    result_subtract = subtract(10, 4)
    print("Result of addition:", result_add)
    print("Result of subtraction:", result_subtract)




def trace_calls(frame, event, arg):
    if event == 'call':
        co = frame.f_code
        func_name = co.co_name
        filename = co.co_filename
        line_no = frame.f_lineno
        print(f"Call to {func_name} at line {line_no} of {filename}")
    return trace_calls

# def main():
    print("Inside main")
    # my_function1()
    # my_function2()

# def my_function1():
    # print("Inside my_function1")

# def my_function2():
#     print("Inside my_function2")
#     my_function1()

# Set the trace function
sys.settrace(trace_calls)

# Run the program
# main()



# import traceback

# def save_stack_trace(filename='stack_trace.txt'):


if __name__ == "__main__":
    main()
#     save_stack_trace()
