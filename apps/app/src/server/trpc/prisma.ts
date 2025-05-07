import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

export const prisma = new PrismaClient({
  datasourceUrl:
    'prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiYjIzOGUxMGMtMDRhNy00ODMxLThiNGQtYWFmNDY2ZmI1NDMzIiwidGVuYW50X2lkIjoiYjZlNjk3YTM4YzY5MTc5NTE0YjZkMDBjNmVlMGI3YzM5YzRmYzI0ZWQxM2M4NzQyYjEwYWE4MWY5MTg0MGM5YSIsImludGVybmFsX3NlY3JldCI6IjNkMGQzNjUwLTNhMGItNDljNS04YjdlLWY3YWFkOGI1MGUzZCJ9.MfN--5PsucFKds7WoJCfU-LpiOzH1bxT-HZYdlIfpnU',
}).$extends(withAccelerate());
