import { publicProcedure, router } from '../trpc';
import { prisma } from '../prisma';
import { ONE_MONTH } from '../../../libs/duration.const';

export const LeagueRouter = router({
  findAll: publicProcedure.query(async (event) =>
    prisma.league.findMany({
      cacheStrategy: {
        ttl: ONE_MONTH,
        tags: ['league_findAll'],
      },
    })
  ),
});
