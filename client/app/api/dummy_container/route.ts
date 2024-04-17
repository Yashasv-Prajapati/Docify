import Dockerode from 'dockerode';
import { NextApiRequest, NextApiResponse } from 'next';

const docker = new Dockerode();

// Function to start the dummy Docker container and send progress updates
export async function startDummyContainer() {
  const containerOptions = {
    Image: 'express-test-net:latest',
    Tty: true,
    HostConfig: {
      AutoRemove: true,
    },
  };

  // Create the container
  const container = await docker.createContainer(containerOptions);

  // Start the container
  await container.start();

  // Wait for the container to finish its job
  await container.wait();
}
// Export default API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Start the dummy container
    const result = await startDummyContainer();

    // Respond with success message
    res.status(200).json({ message: result });
  } catch (error) {
    // Handle errors
    console.error('Error starting dummy container:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
