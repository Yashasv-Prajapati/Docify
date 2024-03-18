public class Outer {
    private int outerAttribute;
    
    public class Inner {
        private int innerAttribute;

        public void innerMethod() {
            System.out.println("Inner method");
        }
    }
}