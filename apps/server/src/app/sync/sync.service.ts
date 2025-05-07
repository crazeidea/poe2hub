import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { POE2ScoutService } from './poe2scout.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { POE2ScoutCategory } from './types/category.response.type';
@Injectable()
export class SyncService implements OnModuleInit {
  constructor(private readonly poe2ScoutService: POE2ScoutService, private readonly prisma: PrismaService) {}

  async onModuleInit() {
    // await this.syncCategories();
    // await this.syncLeagues();
  }

  async syncLeagues() {
    const leagues = await this.poe2ScoutService.getLeagues();
    for (const league of leagues) {
      await this.prisma.league.upsert({
        where: { label: league.value },
        update: { divineRatio: league.divinePrice },
        create: {
          label: league.value,
          divineRatio: league.divinePrice,
        },
      });
    }
  }

  @Cron(CronExpression.EVERY_2_HOURS)
  async syncCategories() {
    const categories = await this.poe2ScoutService.getCategories();
    const _categories: POE2ScoutCategory[] = [...categories.currency_categories, ...categories.unique_categories];

    for (const category of _categories) {
      await this.prisma.category.upsert({
        where: { id: category.apiId },
        update: { icon: category.icon },
        create: { id: category.apiId, icon: category.icon },
      });
    }
  }
}
