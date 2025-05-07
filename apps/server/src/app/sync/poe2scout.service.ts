import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { POE2ScoutCategoryResponse } from './types/category.response.type';
import { POE2ScoutLeague } from './types/league.type';

@Injectable()
export class POE2ScoutService {
  constructor(private readonly http: HttpService) {}

  async getLeagues(): Promise<POE2ScoutLeague[]> {
    return this.http.axiosRef
      .get<POE2ScoutLeague[]>('https://poe2scout.com/api/leagues')
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  async getCategories(): Promise<POE2ScoutCategoryResponse> {
    return this.http.axiosRef
      .get<POE2ScoutCategoryResponse>('https://poe2scout.com/api/items/categories')
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}
