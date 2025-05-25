import java.util.*;
class Person{
    String s;
    int age;
    Person(String s,int age){
        this.s=s;
        this.age=age;
    }
    public int age(){
        return age;
    }

    
}
public class RecordExample {
    public static void main(String[] args) {
        List<Person> people = List.of(
            new Person("Alice", 30),
            new Person("Bob", 20)
        );
        people.stream().filter(p -> p.age() > 25).forEach(System.out::println);
    }
}