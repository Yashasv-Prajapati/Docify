import Dockerode from 'dockerode';

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
// Start the dummy container and send progress updates
startDummyContainer()
  .then(() => {
    console.log('Dummy container finished its job.');
  })
  .catch((error) => {
    console.error('Error starting dummy container:', error);
  });