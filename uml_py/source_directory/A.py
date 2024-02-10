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
