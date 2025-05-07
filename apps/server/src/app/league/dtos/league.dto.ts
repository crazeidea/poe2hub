import { ApiProperty } from '@nestjs/swagger';

export class LeagueDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  divineRatio: number;
}
