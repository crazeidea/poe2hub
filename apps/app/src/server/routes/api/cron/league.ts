import { defineEventHandler } from 'h3';
import { POE2ScoutService } from '../../../poe2scout/service';
import { prisma } from '../../../trpc/prisma';

export default defineEventHandler(async (event) => {
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

  await prisma.$accelerate.invalidate({ tags: ['league_findAll'] });

  console.debug(`Leagues updated. (count: ${leagues.length})`);
});
