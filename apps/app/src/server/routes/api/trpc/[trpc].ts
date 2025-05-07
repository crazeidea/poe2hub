import { appRouter } from '../../../trpc/routers';
import { createContext } from '../../../trpc/context';
import { createTrpcNitroHandler } from '@analogjs/trpc/server';

export default createTrpcNitroHandler({
  router: appRouter,
  createContext,
});
