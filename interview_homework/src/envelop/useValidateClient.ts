import type { Plugin } from 'graphql-yoga';
import { GraphQLError, getOperationAST } from 'graphql';

const CLIENT_HEADER = 'client';
const READ_ONLY_LIST = ['strata'];

export const useValidateClient = (): Plugin => ({
  onRequest({ request, endResponse, fetchAPI }) {
    if (request.method === 'OPTIONS') return;

    const client = request.headers.get(CLIENT_HEADER)?.trim();
    if (!client) {
      endResponse(
        new fetchAPI.Response(
          JSON.stringify({
            errors: [{ message: "Missing required 'client' header" }],
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } },
        ),
      );
    }
  },

  onExecute({ args, setResultAndStopExecution }) {
    const client = args.contextValue.request.headers
      .get(CLIENT_HEADER)
      ?.trim()
      .toLowerCase();

    //We should be able to guarentee te client wont be empty since we validated it above.
    if (!READ_ONLY_LIST.includes(client!)) return;

    const operation = getOperationAST(args.document, args.operationName);
    if (operation?.operation !== 'query') {
      setResultAndStopExecution({
        errors: [
          new GraphQLError(
            `Client '${READ_ONLY_LIST}' is only allowed to run queries`,
            { extensions: { code: 'FORBIDDEN', http: { status: 403 } } },
          ),
        ],
      });
    }
  },
});