import { Address, MutationCreateAddressArgs, NearEarthObjectFeed} from "./__generated__/resolvers-types";
import { getAddress, createAddress } from "./address/address";
import { getNearEarthObjects } from "./meshes/neo/neo"
import { GetAddressArgs } from "./address/types";

export const resolvers = {
  Query: {
    address: (parent: any, args: GetAddressArgs, context: any, info: any): Address => {
      return getAddress(parent, args, context);
    },
    nearEarthObjects: async (parent: any, args: {startDate: string, endDate:string}, context: any, info: any): Promise<NearEarthObjectFeed> => {
      return await getNearEarthObjects(parent, args, context);
    },
  },
  Mutation: {
    createAddress: (parent: any, args: MutationCreateAddressArgs, context: any, info: any): Address => {
      return createAddress(parent, args, context);
    },
  },
};
