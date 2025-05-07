import { Component, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CategoryStore } from '../stores/category.store';
import { LeagueStore } from '../stores/league.store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-economy-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, FormsModule, ReactiveFormsModule],
  templateUrl: './economy.page.html',
  schemas: [NO_ERRORS_SCHEMA],
})
export default class EconomyLayout {
  private readonly categoryStore = inject(CategoryStore);
  readonly leagueStore = inject(LeagueStore);

  leagues = this.leagueStore.leagues;
  selectedLeague = this.leagueStore.selectedLeague;

  categories = this.categoryStore.categories$.value;

  currencyCategories = this.categoryStore.currencyCategories;
  uniqueCategories = this.categoryStore.uniqueCategories;

  selectLeague(leagueId: string) {
    this.leagueStore.setSelectedLeague(leagueId);
  }
}
