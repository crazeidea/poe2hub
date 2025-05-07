import { POE2ScoutCategoryResponse } from './types/category.response.type';
import { POE2ScoutLeague } from './types/league.type';

export class POE2ScoutService {
  static async getLeagues(): Promise<POE2ScoutLeague[]> {
    return fetch('https://poe2scout.com/api/leagues')
      .then((response) => response.json())
      .catch((error) => {
        throw error;
      });
  }

  static async getCategories(): Promise<POE2ScoutCategoryResponse> {
    return fetch('https://poe2scout.com/api/items/categories')
      .then((response) => response.json())
      .catch((error) => {
        throw error;
      });
  }
}
