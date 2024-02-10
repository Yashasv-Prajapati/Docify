// Test class with interface implementation
interface TestInterface {
    void interfaceMethod();
}

public class InterfaceImplementation implements TestInterface {
    @Override
    public void interfaceMethod() {
        System.out.println("Interface method implementation");
    }
}
