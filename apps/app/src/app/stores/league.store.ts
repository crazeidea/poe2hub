import { Injectable, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { League } from '../../../prisma';
import { injectTrpcClient } from '../../trpc-client';

@Injectable({ providedIn: 'root' })
export class LeagueStore {
  private readonly trpc = injectTrpcClient();

  leagues = toSignal(this.trpc.league.findAll.query());

  selectedLeague = linkedSignal<League | null>(() => this.leagues()?.at(0) ?? null);

  setSelectedLeague(leagueId: string) {
    const league = this.leagues()?.find((league) => league.id === leagueId);
    if (league) this.selectedLeague.set(league);
  }
}
