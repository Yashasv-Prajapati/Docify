from utils import print_hello
from math_functions import add, subtract

def main():
    print_hello()
    result_add = add(5, 3)
    result_subtract = subtract(10, 4)
    print("Result of addition:", result_add)
    print("Result of subtraction:", result_subtract)

if __name__ == "__main__":
    main()
