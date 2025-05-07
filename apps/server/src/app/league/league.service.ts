import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LeagueService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.league.findMany();
  }
}
