// Test class with simple attributes and methods
public class TestClass {
    private int number;
    private String text;

    public void setNumber(int number) {
        this.number = number;
    }

    public int getNumber() {
        return number;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void printDetails() {
        System.out.println("Number: " + number);
        System.out.println("Text: " + text);
    }
}