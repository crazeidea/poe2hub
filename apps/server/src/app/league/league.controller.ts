import { Controller, Get } from '@nestjs/common';
import { LeagueService } from './league.service';
import { plainToInstance } from 'class-transformer';
import { LeagueDTO } from './dtos/league.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('league')
export class LeagueController {
  constructor(private readonly leagueService: LeagueService) {}

  @Get()
  @ApiOkResponse({
    type: LeagueDTO,
    isArray: true,
  })
  async findAll() {
    const leagues = await this.leagueService.findAll();

    return plainToInstance(LeagueDTO, leagues);
  }
}
