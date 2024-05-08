/**
 * @jest-environment node
 */
import Dockerode, { Container } from 'dockerode';
import { testApiHandler } from 'next-test-api-route-handler';

import * as appHandler from '@/app/api/uml/generate/route';

describe('POST /api/uml/generate', () => {
  // everything goooooood
  it('POST returns 200', async () => {
    const body = {
      github_access_token: 'token',
      github_username: 'username',
      github_repo_name: 'repo',
      project_type: 'python',
      projectId: 'projectId',
      folderPath: 'folderPath',
    };

    // send a request to the handler
    // and expect a 200 response on successful completion
    const res = await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify(body),
        });
        expect(response.status).toBe(200);
      },
    });
  });

  it('POST return 400', async () => {
    // mock the createContainer method to throw an error
    // we want the error to be thrown to test this case
    const createContainerSpy = jest
      .spyOn(Dockerode.prototype, 'createContainer')
      .mockImplementation((options): Promise<Container> => {
        throw new Error('Mocked Docker error');
      });

    // mock the start method to throw an error
    const startSpy = jest
      .spyOn(Dockerode.Container.prototype, 'start')
      .mockImplementation((options): Promise<Container> => {
        throw new Error('Mocked Docker error');
      });

    const body = {
      github_access_token: 'token',
      github_username: 'username',
      github_repo_name: 'repo',
      project_type: 'invalid_project_type',
      projectId: 'projectId',
      folderPath: 'folderPath',
    };

    // send a request to the handler
    // and expect a 500 response on error
    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify(body),
        });
        expect(response.status).toBe(500);
        expect(await response.json()).toMatchObject({
          message: expect.stringMatching(
            new RegExp(
              'Error starting container|Error waiting for container|Error generating UML'
            )
          ),
        });
      },
    });

    // Important to restore the mocked methods
    createContainerSpy.mockRestore();
    startSpy.mockRestore();
  });

  it('POST returns 500', async () => {
    // mock the createContainer method to throw an error
    // we want the error to be thrown to test this case
    const createContainerSpy = jest
      .spyOn(Dockerode.prototype, 'createContainer')
      .mockImplementation((options): Promise<Container> => {
        throw new Error('Mocked Docker error');
      });

    // mock the start method to throw an error
    const startSpy = jest
      .spyOn(Dockerode.Container.prototype, 'start')
      .mockImplementation((options): Promise<Container> => {
        throw new Error('Mocked Docker error');
      });

    const body = {
      github_access_token: 'token',
      github_username: 'username',
      github_repo_name: 'repo',
      project_type: 'python',
      projectId: 'projectId',
      folderPath: 'folderPath',
    };

    // send a request to the handler
    // and expect a 500 response on error
    await testApiHandler({
      appHandler,
      async test({ fetch }) {
        const response = await fetch({
          method: 'POST',
          body: JSON.stringify(body),
        });
        expect(response.status).toBe(500);
        expect(await response.json()).toMatchObject({
          message: expect.stringMatching(
            new RegExp(
              'Error starting container|Error waiting for container|Error generating UML'
            )
          ),
        });
      },
    });

    // Important to restore the mocked methods
    createContainerSpy.mockRestore();
    startSpy.mockRestore();
  });
});
