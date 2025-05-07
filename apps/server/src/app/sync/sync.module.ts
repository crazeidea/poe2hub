import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { HttpModule } from '@nestjs/axios';
import { POE2ScoutService } from './poe2scout.service';
@Module({
  imports: [HttpModule],
  providers: [POE2ScoutService, SyncService],
})
export class SyncModule {}
