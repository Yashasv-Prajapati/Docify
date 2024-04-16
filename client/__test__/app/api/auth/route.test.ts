import axios from 'axios';
import { GET } from '@/app/api/auth/route';
import { db } from '@/lib/db';
import { sign } from '@/lib/jwt';

jest.mock('axios');
jest.mock('@/lib/db');
jest.mock('@/lib/jwt');

describe('GET function', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should handle successful request', async () => {
    const req = {
      nextUrl: {
        searchParams: {
          get: jest.fn().mockReturnValue('test_code'),
        },
      },
    } as unknown as NextRequest;

    // Mock axios responses
    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        access_token: 'test_access_token',
        refresh_token: 'test_refresh_token',
        expires_in: 3600,
      },
    });

    (axios.get as jest.Mock)
      .mockResolvedValueOnce({
        data: {
          login: 'test_user',
          avatar_url: 'test_avatar_url',
        },
      })
      .mockResolvedValueOnce({
        data: [
          {
            account: {
              login: 'test_user',
            },
            id: 'test_installation_id',
          },
        ],
      });

    // Mock db and jwt functions
    (db.user.findUnique as jest.Mock).mockResolvedValue(null);
    (db.user.create as jest.Mock).mockResolvedValue({
      github_username: 'test_user',
      github_access_token: 'test_access_token',
      github_refresh_token: 'test_refresh_token',
      github_access_token_expiry: new Date(),
      avatar_url: 'test_avatar_url',
      github_installation_id: 'test_installation_id',
    });
    (sign as jest.Mock).mockResolvedValue('test_jwt');

    const res = await GET(req);

    expect(res.status).toEqual(302);
    expect(res.headers.get('Location')).toEqual(
      `http://localhost:3000/dashboard`
    );
  });

  // Add more test cases as needed
});