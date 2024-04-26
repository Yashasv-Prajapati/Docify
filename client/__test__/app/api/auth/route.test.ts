import { headers } from 'next/headers';
import { NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import axios, { AxiosResponse } from 'axios';
import { testApiHandler } from 'next-test-api-route-handler';

// import { db } from '@/lib/db';
import { sign } from '@/lib/jwt';
import { GET } from '@/app/api/auth/route';
import * as appHandler from '@/app/api/auth/route';

/**
 * @jest-environment node
 */

const GITHUB_APP_PRIVATE_KEY =
  '-----BEGIN RSA PRIVATE KEY-----test_private-----END RSA PRIVATE KEY-----' as string;
const GITHUB_API_BASE_URL = 'https://api.github.com';
const crypto = require('crypto');

function generateTestKey() {
  return crypto.randomBytes(32).toString('hex');
}

const GITHUB_APP_ID = 824467;
const mockUserFindUnique = jest.fn();
const mockUserCreate = jest.fn();

const requestOptions = {
  headers: {
    Authorization: `Bearer ${generateJwtToken()}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'Your-App',
  },
};

jest.mock('@prisma/client', () => {
  const mockPrismaClient = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      // Add other User methods as needed
    },
    project: {
      findUnique: jest.fn(),
      create: jest.fn(),
      // Add other Project methods as needed
    },
    markdownFile: {
      findUnique: jest.fn(),
      create: jest.fn(),
      // Add other MarkdownFile methods as needed
    },
    // Add other models as needed
  };

  return {
    PrismaClient: jest.fn(() => mockPrismaClient),
  };
});

// const GITHUB_APP_PRIVATE_KEY = process.env.PRIVATE_KEY as string;

jest.mock('axios');
jest.mock('@/lib/jwt');
function generateJwtToken() {
  const payload = {
    iat: Math.floor(Date.now() / 1000), // Issued at time
    exp: Math.floor(Date.now() / 1000) + 60, // Expiration time (1 minute from now)
    iss: GITHUB_APP_ID, // GitHub App ID
  };

  // console.log(GITHUB_APP_ID, GITHUB_APP_PRIVATE_KEY, payload);

  const jwt = require('jsonwebtoken');
  // const token = jwt.sign(payload, GITHUB_APP_PRIVATE_KEY, {
  // algorithm: 'RS256',
  // });
  //mock token
  const token = 'test_token';

  return token;
}

// describe('GET function', () => {
//   beforeEach(() => {
//     jest.resetAllMocks();
//   });

//   it('should handle successful request', async () => {
//     const req = {
//       nextUrl: {
//         searchParams: {
//           get: jest.fn().mockReturnValue('code'),
//         },
//       },
//     } as unknown as NextRequest;
//     (axios.post as jest.Mock).mockImplementation((url, data, config) => {
//       if (url === 'https://github.com/login/oauth/access_token') {
//         return Promise.resolve({
//           data: {
//                   access_token: 'test_access_token',
//                   refresh_token: 'test_refresh_token',
//                   expires_in: 3600,
//           },
//           body: {
//             client_id: process.env.GITHUB_CLIENT_ID,
//             client_secret: process.env.GITHUB_CLIENT_SECRET,
//             code: req.nextUrl.searchParams.get('code'),
//           }
//         });
//       }
//       // Handle other URLs or return a default value
//     });

//     (axios.get as jest.Mock)
//       .mockResolvedValueOnce({
//         data: {
//           login: 'test_user',
//           avatar_url: 'test_avatar_url',
//         },
//         headers: {
//           Authorization: 'token test_access_token',
//           Accept: 'application/vnd.github.v3+json',
//         }
//       })
//       .mockResolvedValueOnce({
//         data: [
//           {
//             account: {
//               login: 'test_user',
//             },
//             id: 'test_installation_id',
//           },
//         ],
//         headers: {
//           Authorization: `Bearer ${generateJwtToken()}`,
//           Accept: 'application/vnd.github.v3+json',
//           'User-Agent': 'Your-App',
//         },
//       });
//       mockUserFindUnique.mockResolvedValue({
//         github_username: 'test_user',
//         github_access_token: 'test_access_token',
//         github_refresh_token: 'test_refresh_token',
//       });

//       mockUserCreate.mockResolvedValue({

//         github_username: 'test_user',
//       github_access_token: 'test_access_token',
//       github_refresh_token: 'test_refresh_token',
//       github_access_token_expiry: new Date(),
//       avatar_url: 'test_avatar_url',
//       github_installation_id: 'test_installation_id',
//       });

//     (sign as jest.Mock).mockResolvedValue('test_jwt');

//   });

//   // // Add more test cases as needed
// });

it('should redirect to installation URL if app not installed', async () => {
  const req = {
    nextUrl: {
      searchParams: {
        get: jest.fn().mockReturnValue('code'),
      },
    },
  } as unknown as NextRequest;

  (axios.post as jest.Mock).mockImplementation((url, data, config) => {
    if (url === 'https://github.com/login/oauth/access_token') {
      return Promise.resolve({
        data: {
          access_token: 'test_access_token',
          refresh_token: 'test_refresh_token',
          expires_in: 3600,
        },
      });
    }
  });

  (axios.get as jest.Mock)
    .mockResolvedValueOnce({
      data: {
        login: 'test_user',
        avatar_url: 'test_avatar_url',
      },
    })
    .mockResolvedValueOnce({
      data: [],
    });

  const response: AxiosResponse = await axios.get(
    `${GITHUB_API_BASE_URL}/app/installations`,
    requestOptions
  );
  const installations = response.data;

  let installed = false;
  let github_installation_id = '';
  if (installations.length > 0) {
    for (let i = 0; i < installations.length; i++) {
      const user_name = installations[i].account.login;
      // const installation_id = installations[i].id;

      if (user_name === 'test_user') {
        installed = true;
        github_installation_id = installations[i].id;
        break;
      }
    }
  }
  expect(installed).toBe(false);
});

// it("should go to instllation if user didn't install", async () => {
//   const req = {
//     nextUrl: {
//       searchParams: {
//         get: jest.fn().mockReturnValue('code'),
//       },
//     },
//   } as unknown as NextRequest;

//   (axios.post as jest.Mock).mockImplementation((url, data, config) => {
//     if (url === 'https://github.com/login/oauth/access_token') {
//       return Promise.resolve({
//         data: {
//           access_token: 'test_access_token',
//           refresh_token: 'test_refresh_token',
//           expires_in: 3600,
//         },
//       });
//     }
//   });

//   (axios.get as jest.Mock)
//     .mockResolvedValueOnce({
//       data: {
//         login: 'test_user',
//         avatar_url: 'test_avatar_url',
//       },
//     })
//     .mockResolvedValueOnce({
//       data: [
//         {
//           account: {
//             login: 'test_user',
//           },
//           id: 'test_installation_id',
//         },
//       ],
//     });

//   mockUserFindUnique.mockResolvedValue(null);
//   mockUserCreate.mockResolvedValue({
//     github_username: 'test_user',
//     github_access_token: 'test_access_token',
//     github_refresh_token: 'test_refresh_token',
//     github_access_token_expiry: new Date(),
//     avatar_url: 'test_avatar_url',
//     github_installation_id: 'test_installation_id',
//   });

//   (sign as jest.Mock).mockResolvedValue('test_jwt');

//   const response = await GET(req);

//   // expect(response.status).toBe(302);
//   expect(response.headers.get('Location')).toBe(`https://github.com/apps/docify-wiki/installations/new?target_id=${GITHUB_APP_ID}&target_type=app`);
//   // expect(mockUserCreate).toHaveBeenCalled();
// });
