// /jest.setup.ts
import '@testing-library/jest-dom';
import 'jest-canvas-mock';

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
