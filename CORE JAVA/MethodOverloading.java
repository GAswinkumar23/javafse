public class MethodOverloading {
    public static int add(int a, int b) {
        return a + b;
    }
    public static double add(double a, double b) {
        return a + b;
    }
    public static int add(int a, int b, int c) {
        return a + b + c;
    }
    public static void main(String[] args) {
        System.out.println("Add 2 ints: " + add(2, 3));
        System.out.println("Add 2 doubles: " + add(2.5, 3.5));
        System.out.println("Add 3 ints: " + add(1, 2, 3));
    }
}
