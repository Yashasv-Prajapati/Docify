public class MultithreadingExample {
    public static void main(String[] args) {
        Thread thread1 = new Thread(new MyRunnable());
        Thread thread2 = new MyThread();
        thread1.start();
        thread2.start();
    }
    
    static class MyRunnable implements Runnable {
        @Override
        public void run() {
            System.out.println("Runnable thread running");
        }
    }
    
    static class MyThread extends Thread {
        @Override
        public void run() {
            System.out.println("Extended Thread running");
        }
    }
}
