import { inject, Injectable, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LeagueDto, LeagueService } from '@poe2hub/api-client';

@Injectable({ providedIn: 'root' })
export class LeagueStore {
  private readonly leagueService = inject(LeagueService);

  leagues = toSignal(this.leagueService.leagueControllerFindAll());

  selectedLeague = linkedSignal<LeagueDto | null>(() => this.leagues()?.at(0) ?? null);

  setSelectedLeague(leagueId: string) {
    const league = this.leagues()?.find((league) => league.id === leagueId);
    if (league) this.selectedLeague.set(league);
  }
}
