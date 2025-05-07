import { Component, computed, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CategoryStore } from '../stores/category.store';
import { LeagueStore } from '../stores/league.store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-default',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule],
  templateUrl: './default.layout.html',
  styleUrl: './default.layout.css',
  schemas: [NO_ERRORS_SCHEMA],
})
export class DefaultLayout {
  private readonly categoryStore = inject(CategoryStore);
  readonly leagueStore = inject(LeagueStore);

  leagues = this.leagueStore.leagues;
  selectedLeague = this.leagueStore.selectedLeague;

  categories = this.categoryStore.categories$.value;

  currencyCategories = computed(() => this.categories().filter((category) => category.section === 0));
  uniqueCategories = computed(() => this.categories().filter((category) => category.section === 1));

  selectLeague(leagueId: string) {
    this.leagueStore.setSelectedLeague(leagueId);
  }
}
