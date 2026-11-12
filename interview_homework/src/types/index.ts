import type { YogaInitialContext } from 'graphql-yoga';
import { Logger } from '../logger';

export type ContextType = YogaInitialContext &{
  clientId: string;
  requestId: string;
  logger: Logger;
};
