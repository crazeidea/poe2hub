import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDTO } from './dtos/category.dto';
import { plainToInstance } from 'class-transformer';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOkResponse({
    type: CategoryDTO,
    isArray: true,
  })
  @UseInterceptors(CacheInterceptor)
  async findAll() {
    const categories = await this.categoryService.findAll();
    return plainToInstance(CategoryDTO, categories);
  }
}
