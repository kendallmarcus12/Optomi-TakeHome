import { describe, expect, test } from '@jest/globals';
import { parse } from 'graphql';
import { executor } from '../exectuor';


describe('createAddress', () => {
  test('Standard Create Address', async () => {
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

    expect(result).toMatchObject({
      "data": {
        "createAddress": {
          city: 'charlotte',
          state: 'NC',
        }
      }
    });
  });

  test('Duplicate Error', async () => {
    const query = `
            mutation CreateAddress($addressInput: CreateAddressInput!) {
                createAddress(addressInput: $addressInput) {
                    street
                    city
                    zipcode
                    state
                }
            }
        `;

    const variables = {
      addressInput: {
        username: 'jack',
        address: { street: '789 Oak Ave.', city: 'Another Town', zipcode: '67890', state: 'CA' },
      },
    };

    const result = await executor({
      document: parse(query),
      variables,
    });
    
    expect(result).toMatchObject(
      {
        "errors": expect.arrayContaining([expect.objectContaining({
          "message": "Unable to create new address in createAddress resolver"
        })])
      }
    );
  });
});
