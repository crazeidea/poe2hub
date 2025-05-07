import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { SyncModule } from './sync/sync.module';
import { CategoryModule } from './category/category.module';
import { CacheModule } from '@nestjs/cache-manager';
import { LeagueModule } from './league/league.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    PrismaModule,
    SyncModule,
    CategoryModule,
    LeagueModule,
    ItemModule,
  ],
})
export class AppModule {}
