// /jest.setup.ts
import '@testing-library/jest-dom';

// require('dotenv').config({ path: '.env.test' });
process.env.GITHUB_CLIENT_ID = 'Iv1.1b5aed7d626fad11';
process.env.GITHUB_CLIENT_SECRET = '2e0d7464635921fac52e047a621a285109b8fc0f';
process.env.GITHUB_APP_ID = '824467';
process.env.GITHUB_ACCESS_TOKEN = 'ghu_l0OSEBAn0Xbf75589ugBJjmwbdPDkw3srg0p';
process.env.GITHUB_REDIRECT_URI = 'http://localhost:3000/api/auth';
process.env.NEXT_PUBLIC_APP_ID = '824467';
process.env.NEXT_SERVER_URL = 'http://localhost:3000';
process.env.NEXTAUTH_SECRET = '5apRdFz6FsbQzXtEp6ume1tkF4RWa+EK4G+JtK2jAq0=';
process.env.DATABASE_URL = 'file:./dev.db';
process.env.JWT_SECRET = 'secretkey';

// import { PrismaClient } from '@prisma/client'
// import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended'

// import {db} from '@/lib/db'

// jest.mock('@/lib/db', () => ({
//     __esModule: true,
//     default: mockDeep<PrismaClient>(),
//   }))

//   beforeEach(() => {
//     mockReset(db)
//   })

//   export const prismaMock = db as unknown as DeepMockProxy<PrismaClient>
