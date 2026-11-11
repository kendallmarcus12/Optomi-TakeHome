import { handleStreamOrSingleExecutionResult, type Plugin } from 'graphql-yoga';
import { ContextType } from '../types';


export const useRequestFinalizer = (): Plugin<ContextType> => {
    return {
        onExecute({ args, context }) {
            return {
                onExecuteDone(payload) {
                    return handleStreamOrSingleExecutionResult(payload, ({ result, setResult }) => {
                        setResult({
                            ...result, metadata: { requestId: context.requestId },
                        } as unknown as typeof result);
                    });
                }
            }
        }
    }
};