import { defineEventHandler } from 'h3';
import { POE2ScoutService } from '../../../poe2scout/service';
import { prisma } from '../../../trpc/prisma';
import { POE2ScoutCategory } from '../../../poe2scout/types/category.response.type';

export default defineEventHandler(async (event) => {
  const categories = await POE2ScoutService.getCategories();

  const _categories: POE2ScoutCategory[] = [...categories.currency_categories, ...categories.unique_categories];

  for (const category of _categories) {
    await prisma.category.upsert({
      where: { id: category.apiId },
      update: { icon: category.icon },
      create: { id: category.apiId, icon: category.icon },
    });
  }

  await prisma.$accelerate.invalidate({ tags: ['category_findAll'] });

  console.debug(`Categories updated. (count: ${_categories.length})`);
});
