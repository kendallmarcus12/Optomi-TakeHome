import type { Plugin } from '@envelop/core';
import { Logger } from '../logger';
import { ContextType } from '../types';

export const useLogger = (): Plugin<ContextType> => {
  return {
    onContextBuilding({ context, extendContext }) {
      const logger = new Logger();
      logger.setRequestId(context.requestId);
      logger.setClientId(context.clientId);
      extendContext({ logger: logger });
    },
  };
};
