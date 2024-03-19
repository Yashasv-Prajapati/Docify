import junit.framework.TestCase;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;


public class CalculatorIntegrationTest extends TestCase {

    private Connection connection;
    private static final String CREATE_TABLE_QUERY = "CREATE TABLE IF NOT EXISTS calculations (id INT PRIMARY KEY AUTO_INCREMENT, operand1 INT, operand2 INT, operation CHAR(1), result INT)";
    private static final String INSERT_DATA_QUERY = "INSERT INTO calculations (operand1, operand2, operation, result) VALUES (?, ?, ?, ?)";

    public void setUp() throws SQLException {
        // Initialize the in-memory H2 database
        connection = DriverManager.getConnection("jdbc:h2:mem:test;DB_CLOSE_DELAY=-1");
        connection.createStatement().execute(CREATE_TABLE_QUERY);
    }

    public void testAdditionWithDatabase() throws SQLException {
        // Arrange
        Calculator calculator = new Calculator();
        int a = 5;
        int b = 3;
        int expectedResult = a + b;
        try (PreparedStatement statement = connection.prepareStatement(INSERT_DATA_QUERY)) {
            statement.setInt(1, a);
            statement.setInt(2, b);
            statement.setString(3, "+");
            statement.setInt(4, expectedResult);
            statement.executeUpdate();
        }

        // Act
        int result = calculator.add(a, b);

        // Assert
        assertEquals(expectedResult, result);
    }

    public void tearDown() throws SQLException {
        // Close the database connection after testing
        if (connection != null) {
            connection.createStatement().execute("DROP TABLE calculations");
            connection.close();
        }
    }
}
