import { router } from '../trpc';
import { CategoryRouter } from './category';
import { LeagueRouter } from './league';

export const appRouter = router({
  category: CategoryRouter,
  league: LeagueRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
