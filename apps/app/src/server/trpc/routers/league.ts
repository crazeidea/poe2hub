import { publicProcedure, router } from '../trpc';
import { prisma } from '../prisma';
import { POE2ScoutService } from '../../poe2scout/service';

export const LeagueRouter = router({
  findAll: publicProcedure.query(async (event) => {
    const check = await prisma.league.count({});

    if (check === 0) {
      const leagues = await POE2ScoutService.getLeagues();
      for (const league of leagues) {
        await prisma.league.upsert({
          where: { label: league.value },
          update: { divineRatio: league.divinePrice },
          create: {
            label: league.value,
            divineRatio: league.divinePrice,
          },
        });
      }
    }

    const leagues = await prisma.league.findMany({});

    return leagues;
  }),
});
