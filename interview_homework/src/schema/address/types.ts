import { Address } from '../__generated__/resolvers-types';

export type Addresses = {
  [key: string]: Address;
};

export type GetAddressArgs = {
  username: string;
};