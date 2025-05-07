import { publicProcedure, router } from '../trpc';
import { prisma } from '../prisma';
import { POE2ScoutService } from '../../poe2scout/service';
import { POE2ScoutCategory } from '../../poe2scout/types/category.response.type';

export const CategoryRouter = router({
  findAll: publicProcedure.query(async (event) => {
    const check = await prisma.category.count({});

    if (check === 0) {
      const categories = await POE2ScoutService.getCategories();

      const _categories: POE2ScoutCategory[] = [...categories.currency_categories, ...categories.unique_categories];

      for (const category of _categories) {
        await prisma.category.upsert({
          where: { id: category.apiId },
          update: { icon: category.icon },
          create: { id: category.apiId, icon: category.icon },
        });
      }
    }

    const categories = await prisma.category.findMany({
      orderBy: [{ order: 'asc' }],
    });

    return categories;
  }),
});
