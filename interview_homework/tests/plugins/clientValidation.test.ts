import { parse } from 'graphql';
import { executor } from '../exectuor';

describe('Client Validation', () => {
  test('Reject on empty client', async () => {
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
      extensions: {headers: {client: ""}}
    });

    expect(result).toEqual(
    expect.objectContaining(
      {
        "errors": expect.arrayContaining([expect.objectContaining({
          "message": "Missing required 'client' header"
        })])
      }
    )
    );
  });
});
