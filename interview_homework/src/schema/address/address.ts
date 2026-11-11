import { GetAddressArgs } from './types';
import { MutationCreateAddressArgs, Address } from '../__generated__/resolvers-types';
import { GraphQLError } from 'graphql';


const  _getAddress = (context: any, username: string): Address | null => {
  return context.store.getByName(username);
};

const _createAddress = (context: any, username: string, address: Address): Address => {
  return context.store.create(username, address ?? {})
};

export const getAddress = (_: any, args: GetAddressArgs, context: any): Address => {
  context.logger.info('getAddress: ' + 'Enter resolver');

  const address = _getAddress(context, args.username);
  if (address) {
    context.logger.info('getAddress: ' + 'Returning address');
    return address;
  }
  context.logger.error('getAddress: ' + 'No address found');
  throw new GraphQLError('No address found in getAddress resolver');
};


//CREATE - Should not squash current records
export const createAddress = (_: any, args: MutationCreateAddressArgs, context: any): Address => {
  context.logger.info('createAddress: ' + 'Enter resolver');
  const { username, address: addressInput } = args.addressInput;
  if(_getAddress(context, username)) {
    context.logger.error('createAddress: ' + 'Unable to create new address due to existing address');
    throw new GraphQLError('Unable to create new address in createAddress resolver');
  }
  try{
    const address = _createAddress(context, username, addressInput);
    context.logger.info('createAddress: ' + 'Inserted new address: ' + JSON.stringify(address));
    return address;

  }catch(error){
    context.logger.error('createAddress: ' + 'Error occurred while creating address\t' + error);
    throw new GraphQLError('Error occurred while creating address in createAddress resolver');
  }
};
