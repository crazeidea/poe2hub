import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { injectParams } from 'ngxtension/inject-params';
import { CategoryStore } from '../../stores/category.store';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  template: ` @if (category(); as category) {
    <main>
      <h1>{{ category.name }}</h1>
    </main>
    }`,
})
export default class HomePage {
  private readonly categoryStore = inject(CategoryStore);
  private readonly categoryId = injectParams('categoryId');

  category = computed(() => {
    const categoryId = this.categoryId();
    if (!categoryId) {
      return null;
    }
    return this.categoryStore.findById(categoryId);
  });
}
