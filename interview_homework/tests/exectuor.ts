import { jest } from '@jest/globals';
import { createYoga } from 'graphql-yoga';
import { buildHTTPExecutor } from '@graphql-tools/executor-http';
import { genSchema } from '../src/schema';
import plugins from '../src/envelop/index';
import { AddressDataStore } from '../src/datasource/addressDataSource';
import {UsState} from '../src/schema/__generated__/resolvers-types';

console.profile = jest.fn();
const schema = genSchema();

const store = new AddressDataStore({
  "jack": {
    "street": "123 Street St.",
    "city": "Sometown",
    "zipcode": "43215"
  },
  "jill": {
    "street": "234 Other St",
    "city": "Townville",
    "zipcode": "32145"
  },
  "witch": {
    "street": "456 Sweets St.",
    "city": "Candyville",
    "zipcode": "11111",
    "state": UsState.Oh,
  }
});


const yoga = createYoga({ schema, plugins, context: { store }});

export const executor = buildHTTPExecutor({ 
  headers: { 'client': 'testuser' },
  fetch: yoga.fetch,
});
