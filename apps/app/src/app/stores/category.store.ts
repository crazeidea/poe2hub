import { computed, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { injectTrpcClient } from '../../trpc-client';
import { Category } from '@prisma/client';

@Injectable({ providedIn: 'root' })
export class CategoryStore {
  private readonly trpc = injectTrpcClient();

  categories$ = rxResource({
    loader: () => this.trpc.category.findAll.query(),
    defaultValue: [],
  });

  currencyCategories = computed(() =>
    this.categories$.value().filter((category: Category) => category.type === '화폐')
  );

  uniqueCategories = computed(() => this.categories$.value().filter((category: Category) => category.type === '고유'));

  findById(id: string) {
    return this.categories$.value().find((category: any) => category.id === id);
  }
}
