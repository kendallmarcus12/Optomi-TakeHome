import { parse } from 'graphql';
import { describe, expect, test } from '@jest/globals';
import { executor } from '../exectuor';

describe('request finalizer tests', () => {
  test('Check metadata contains requestId', async () => {
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
    });

    expect((result as any).metadata).toEqual({
        requestId: expect.any(String),
    });
  });
});
