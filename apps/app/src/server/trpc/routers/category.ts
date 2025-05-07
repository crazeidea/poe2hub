import { publicProcedure, router } from '../trpc';
import { prisma } from '../prisma';
import { ONE_MONTH } from '../../../libs/duration.const';

export const CategoryRouter = router({
  findAll: publicProcedure.query(async (event) => {
    const categories = await prisma.category.findMany({
      orderBy: [{ order: 'asc' }],
      cacheStrategy: {
        ttl: ONE_MONTH,
        tags: ['category_findAll'],
      },
    });

    return categories;
  }),
});
