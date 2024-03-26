import unittest

import sys
# caution: path[0] is reserved for script path (or '' in REPL)
sys.path.append('../')
from code_files import sumation

class LearnTest(unittest.TestCase):

    def test_func_1(self):
        pass

    def test_func_2(self):
        pass

    def test_func_code_files(self):
        #arrange
        a=10
        b=5
        #act
        result=sumation.sum(a,b)
        #assert
        self.assertEqual(result, a+b)



if __name__ == "__main__":
    unittest.main()