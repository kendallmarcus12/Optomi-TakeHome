import { handleStreamOrSingleExecutionResult, type Plugin } from 'graphql-yoga';
import { ContextType } from '../types';

//Needed to cast to pass into setResult as creating with object literal wont allow you to send it in. 
type WithMetadata<T> = T & { metadata?: { requestId: string } };

export const useRequestFinalizer = (): Plugin<ContextType> => {
    return { 
        onExecute({ args, context }) {
            return {
                onExecuteDone(payload) {
                    return handleStreamOrSingleExecutionResult(payload, ({ result, setResult }) => {
                        const resultWithMetadata: WithMetadata<typeof result> = {
                            ...result,
                            metadata: { requestId: context.requestId },
                        };
                        setResult(resultWithMetadata);
                    });
                }
            }
        }
    }
};