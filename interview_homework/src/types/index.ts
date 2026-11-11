import type { YogaInitialContext } from 'graphql-yoga';
import { Logger } from '../logger';

export type ContextType = YogaInitialContext &{
  requestId: string;
  logger: Logger;
};
