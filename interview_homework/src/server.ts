import { createServer } from 'node:http';
import { genSchema } from './schema';
import { createYoga } from 'graphql-yoga';
import {AddressDataStore} from './datasource/addressDataSource';
import plugins from './envelop';

const yogaPort = 4000;

(async () => {

  const store = AddressDataStore.fromFile('./data/addresses.json');

  const schema = await genSchema();
  const yoga = createYoga({ schema, plugins: plugins, context: { store } });
  const server = createServer(yoga);

  server.listen(yogaPort, () => {
    console.log(`Server is listening at http://localhost:${yogaPort}/graphql`);
  });
})();
