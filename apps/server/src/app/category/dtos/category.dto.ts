import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CategoryDTO {
  @ApiProperty()
  id: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  section: number;
}
