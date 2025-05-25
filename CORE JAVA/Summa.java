package com.utils;
public class Util {
    public static String greet(String name) {
        return "Hello, " + name;
    }
}

// com.utils/module-info.java
module com.utils {
    exports com.utils;
}

// com.greetings/Main.java
package com.greetings;
import com.utils.Util;
public class Summa {
    public static void main(String[] args) {
        System.out.println(Util.greet("World"));
    }
}

// com.greetings/module-info.java
module com.greetings {
    requires com.utils;
}