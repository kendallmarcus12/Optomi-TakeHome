import { createServer } from 'node:http';
import { genSchema } from './schema';
import { createYoga } from 'graphql-yoga';
import {AddressDataStore} from './datasource/addressDataSource';
import plugins from './envelop';
import { getMeshSDK } from '../.mesh';

const yogaPort = 4000;

(async () => {

  const store = AddressDataStore.fromFile('./data/addresses.json');

  const schema = await genSchema();
  const meshSDK = await getMeshSDK();
  const yoga = createYoga({ schema: schema, plugins: plugins, context: { store, meshSDK } });
  const server = createServer(yoga);

  server.listen(yogaPort, () => {
    console.log(`Server is listening at http://localhost:${yogaPort}/graphql`);
  });
})();
