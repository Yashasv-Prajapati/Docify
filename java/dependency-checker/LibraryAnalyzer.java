import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.File;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class LibraryAnalyzer {

    public static Set<String> extractLibraries(String filePath, Set<String> javaFiles) {
        Set<String> libraries = new HashSet<>();
        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = br.readLine()) != null) {
                // Extract imported libraries
                Matcher importMatcher = Pattern.compile("import\\s+([\\w.]+(?:\\.\\w+)*);").matcher(line);
                while (importMatcher.find()) {
                    String importedLibrary = importMatcher.group(1);
                    if (!importedLibrary.startsWith("java.") && !importedLibrary.startsWith("javax.") && !importedLibrary.startsWith("org.")) {
                        String[] parts = importedLibrary.split("\\.");
                        String lastSegment = parts[parts.length - 1];
                        if (javaFiles.contains(lastSegment)) {
                            libraries.addAll(extractLibraries(lastSegment + ".java", javaFiles));
                        } else {
                            libraries.add(importedLibrary);
                        }
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return libraries;
    }

    public static Set<String> listJavaFiles(File directory) {
        Set<String> javaFiles = new HashSet<>();
        File[] files = directory.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    javaFiles.addAll(listJavaFiles(file)); // Recursively list Java files in subdirectories
                } else if (file.getName().endsWith(".java")) {
                    javaFiles.add(file.getName().substring(0, file.getName().lastIndexOf('.')));
                }
            }
        }
        return javaFiles;
    }

    public static void analyzeFiles(File directory, String requirementsFilePath) {
        Set<String> javaFiles = listJavaFiles(directory);
        File[] files = directory.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    analyzeFiles(file, requirementsFilePath); // Recursively analyze subdirectories
                } else if (file.getName().endsWith(".java")) {
                    System.out.println(file.getName());
                    Set<String> libraries = extractLibraries(file.getAbsolutePath(), javaFiles);
                    writeLibrariesToRequirementsFile(libraries, requirementsFilePath);
                }
            }
        }
    }

    public static void writeLibrariesToRequirementsFile(Set<String> libraries, String requirementsFilePath) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(requirementsFilePath, true))) {
            for (String library : libraries) {
                writer.write(library);
                writer.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        if (args.length != 1) {
            System.out.println("Usage: java LibraryAnalyzer <DirectoryPath>");
            return;
        }

        String directoryPath = args[0];
        String requirementsFilePath = ".docify-assets/requirements.txt";

        File directory = new File(directoryPath);
        if (!directory.exists() || !directory.isDirectory()) {
            System.out.println("Invalid directory path.");
            return;
        }

        analyzeFiles(directory, requirementsFilePath);
        System.out.println("Libraries written to " + requirementsFilePath);
    }
}