import java.io.*;
import java.nio.file.*;

public class CombineFiles {
    public static void main(String[] args) {
        String directoryPath = "source_directory";
        String outputFile = "combinedFile.txt";
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(outputFile))) {
            Files.walk(Paths.get(directoryPath))
                    .filter(Files::isRegularFile)
                    .forEach(file -> {
                        try (BufferedReader reader = new BufferedReader(new FileReader(file.toFile()))) {
                            String line;
                            while ((line = reader.readLine()) != null) {
                                writer.write(line);
                                writer.newLine();
                            }
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    });
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("Files combined successfully.");
    }
}
