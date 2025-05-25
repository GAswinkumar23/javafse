import java.io.*;
import java.net.*;
public class Client {
    public static void main(String[] args) throws IOException {
        Socket socket = new Socket("localhost", 1234);
        BufferedReader input = new BufferedReader(new InputStreamReader(System.in));
        PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
        String userInput;
        while ((userInput = input.readLine()) != null) {
            out.println(userInput);
        }
    }
}