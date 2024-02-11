// Test class with generic types
public class GenericTestClass<T> {
    private T genericAttribute;

    public void setGenericAttribute(T genericAttribute) {
        this.genericAttribute = genericAttribute;
    }

    public T getGenericAttribute() {
        return genericAttribute;
    }
}