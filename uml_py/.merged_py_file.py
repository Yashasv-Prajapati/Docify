# Content from: ./.merged_py_file.py


# Content from: ./source_directory/A.py
class Foo():
    def print_foo(self):
        print("hi")

class Test(Foo):
    def __init__(self):
        self.test = "test"
        self.foo = 2

    def print_foo(self):
        print("hello")

    def print_test(self):
        print("test")


# Content from: ./source_directory/B.py
class Bar(Foo):
    pass


# Content from: ./source_directory/__init__.py


