export interface POE2ScoutCategoryResponse {
  unique_categories: POE2ScoutCategory[];
  currency_categories: POE2ScoutCategory[];
}

export interface POE2ScoutCategory {
  id: number;
  apiId: string;
  label: string;
  icon: string;
}
