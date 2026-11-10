import { parse } from 'graphql';
import { executor } from '../exectuor';

describe('getAddress', () => {
  test('Standard Fetch', async () => {
    const query = `
            query GetAddress($username: String!) {
                address(username: $username) {
                    street
                    city
                    zipcode
                }
            }
        `;

    const variables = { username: 'jack' };

    const result = await executor({
      document: parse(query),
      variables,
    });

    expect(result).toEqual({
      "data": {
        "address": {
          street: '123 Street St.',
          city: 'Sometown',
          zipcode: '43215',
        }
      }
    });
  });

  test('State Fetch Success', async () => {
    const query = `
            query GetAddress($username: String!) {
                address(username: $username) {
                    street
                    city
                    zipcode
                    state
                }
            }
        `;

    const variables = { username: 'witch' };

    const result = await executor({
      document: parse(query),
      variables,
    });

    expect(result).toEqual({
      "data": {
        "address": {
          street: '456 Sweets St.',
          city: 'Candyville',
          zipcode: '11111',
          state: 'OH'
        }
      }
    });
  });

  test('Error', async () => {
    const query = `
            query GetAddress($username: String!) {
                address(username: $username) {
                    street
                    city
                    zipcode
                    state
                }
            }
        `;

    const variables = { username: 'john' };

    const result = await executor({
      document: parse(query),
      variables,
    });
    
    expect(result).toEqual(
    expect.objectContaining(
      {
        "errors": expect.arrayContaining([expect.objectContaining({
          "message": "No address found in getAddress resolver"
        })])
      }
    )
    );
  });
});
