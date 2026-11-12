import { NearEarthObjectFeed } from '../../__generated__/resolvers-types';
import { Sdk } from '../../../../.mesh';


//Transformations happen on the data coming in via neo-inflight-resolvers and the meshrc.yml
//For normal values check back at https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY 
export const getNearEarthObjects = async (_: any, args: {startDate: string, endDate:string}, context: any): Promise<NearEarthObjectFeed> => {
  context.logger.info('getNearEarthObjects: ' + 'Enter resolver');

  try{
    const meshSDK = context.meshSDK as Sdk;

    let res = await meshSDK.NasaNeoFeed({start_date: args.startDate, end_date: args.endDate});
    if(!res.neoFeed){
      throw new Error('Endpoing returned no results');
    }
    return res.neoFeed
  }catch(e){
    throw e
  }
};
