import { Component, computed, inject, resource } from '@angular/core';
import { CommonModule } from '@angular/common';
import { injectParams } from 'ngxtension/inject-params';
import { CategoryStore } from '../../stores/category.store';

@Component({
  selector: 'app-category',
  imports: [CommonModule],
  templateUrl: './category.page.html',
  styleUrl: './category.page.css',
})
export default class CategoryPage {
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
