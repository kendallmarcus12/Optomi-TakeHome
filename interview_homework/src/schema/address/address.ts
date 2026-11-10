import * as addressTable from '../../../data/addresses.json';
import { Addresses, Args } from './types';
import { CreateAddressInput, Address } from '../__generated__/resolvers-types';
import { GraphQLError } from 'graphql';
const addresses = structuredClone(addressTable) as Addresses;

const _getAddress = (username: string): Address | null => {
  return addresses[username];
};

const _createAddress = (username: string, address: Address): Address => {
  addresses[username] = address;
  return addresses[username];
};

export const getAddress = (_: any, args: Args, context: any): Address => {
  context.logger.info('getAddress', 'Enter resolver');
  const address = _getAddress(args.username);
  if (address) {
    context.logger.info('getAddress', 'Returning address');
    return address;
  }
  context.logger.error('getAddress', 'No address found');
  throw new GraphQLError('No address found in getAddress resolver');
};


//CREATE - Should not squash current records
export const createAddress = (_: any, args: CreateAddressInput, context: any): Address => {
  context.logger.info('createAddress', 'Enter resolver');
  if(_getAddress(args.username)) {
    context.logger.error('createAddress', 'Unable to create new address due to existing address');
    throw new GraphQLError('Unable to create new address in createAddress resolver');
  }
  try{
    const address = _createAddress(args.username, args.address);
    context.logger.info('createAddress', 'Inserted new address: ' + JSON.stringify(address));
    return address;

  }catch(error){
    context.logger.error('createAddress', 'Error occurred while creating address\t' + error);
    throw new GraphQLError('Error occurred while creating address in createAddress resolver');
  }
};
