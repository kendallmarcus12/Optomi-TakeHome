import { Address } from "./__generated__/resolvers-types";
import { getAddress } from "./address/address";
import { Args } from "./address/types";

export const resolvers = {
  Query: {
    address: (parent: any, args: Args, context: any, info: any): Address => {
      return getAddress(parent, args, context);
    },
  },
};
