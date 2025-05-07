import { inject, Injectable } from '@angular/core';
import { CategoryService } from '@poe2hub/api-client';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class CategoryStore {
  private readonly categoryService = inject(CategoryService);

  categories$ = rxResource({
    loader: () => this.categoryService.categoryControllerFindAll(),
    defaultValue: [],
  });

  findById(id: string) {
    return this.categories$.value().find((category) => category.id === id);
  }
}
