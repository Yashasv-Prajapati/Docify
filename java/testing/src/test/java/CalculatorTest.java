import junit.framework.TestCase;

public class CalculatorTest extends TestCase {
    private Calculator calculator;

    @Override // This method is called before each test method automatically
    protected void setUp() throws Exception {
        super.setUp();
        calculator = new Calculator();
    }

    public void testAddition() {
        int result = calculator.add(2, 3);
        assertEquals(5, result);
    }

    public void testSubtraction() {
        int result = calculator.subtract(5, 3);
        assertEquals(2, result);
    }

    public void testDividePositiveNumbers() {
        double result = calculator.divide(10, 2);
        assertEquals(5.0, result, 0.001); // Check if the result is approximately 5.0
    }

    public void testDivideByZero() {
        try {
            calculator.divide(10, 0);
            fail("Expected IllegalArgumentException was not thrown");
        } catch (IllegalArgumentException e) {
            // Expected exception
        }
    }

    public void testMultiplication() {
        int result = calculator.multiply(2, 3);
        assertEquals(6, result);
    }
}