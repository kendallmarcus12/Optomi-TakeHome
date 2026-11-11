import { parse } from 'graphql';
import { executor } from '../exectuor';

describe('Strata User', () => {
  test('Reject on Mutation', async () => {
    const query = `
          mutation CreateAddress {
            createAddress(addressInput: {
              username: "new guy",
              address: { city: "charlotte", state: NC }
            }) {
              city
              state
            }
          }
        `;

    const result = await executor({
      document: parse(query),
      extensions: {headers: {client: 'strata'}}
    });

    expect(result).toEqual(
    expect.objectContaining(
      {
        "errors": expect.arrayContaining([expect.objectContaining({
          "message": "Client 'strata' is only allowed to run queries"
        })])
      }
    )
    );
  });
});
