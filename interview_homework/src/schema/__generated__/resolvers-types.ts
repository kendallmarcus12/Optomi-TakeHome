import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']['output']>;
  state?: Maybe<UsState>;
  street?: Maybe<Scalars['String']['output']>;
  zipcode?: Maybe<Scalars['String']['output']>;
};

export type AddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<UsState>;
  street?: InputMaybe<Scalars['String']['input']>;
  zipcode?: InputMaybe<Scalars['String']['input']>;
};

export type BasicQuery = {
  __typename?: 'BasicQuery';
  username?: Maybe<Scalars['String']['output']>;
};

export type CreateAddressInput = {
  address: AddressInput;
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAddress?: Maybe<Address>;
};


export type MutationCreateAddressArgs = {
  addressInput: CreateAddressInput;
};

export type NearEarthObject = {
  __typename?: 'NearEarthObject';
  closeApproachDate?: Maybe<Scalars['String']['output']>;
  estimatedDiameterMaxKm?: Maybe<Scalars['Float']['output']>;
  estimatedDiameterMinKm?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  isPotentiallyHazardousAsteroid?: Maybe<Scalars['Boolean']['output']>;
  missDistanceKm?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  relativeVelocityKph?: Maybe<Scalars['String']['output']>;
};

export type NearEarthObjectFeed = {
  __typename?: 'NearEarthObjectFeed';
  elementCount?: Maybe<Scalars['Int']['output']>;
  objects?: Maybe<Array<Maybe<NearEarthObject>>>;
};

export type Query = {
  __typename?: 'Query';
  address?: Maybe<Address>;
  nearEarthObjects?: Maybe<NearEarthObjectFeed>;
};


export type QueryAddressArgs = {
  username: Scalars['String']['input'];
};


export type QueryNearEarthObjectsArgs = {
  endDate: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};

export enum UsState {
  Ak = 'AK',
  Al = 'AL',
  Ar = 'AR',
  Az = 'AZ',
  Ca = 'CA',
  Co = 'CO',
  Ct = 'CT',
  De = 'DE',
  Fl = 'FL',
  Ga = 'GA',
  Hi = 'HI',
  Ia = 'IA',
  Id = 'ID',
  Il = 'IL',
  In = 'IN',
  Ks = 'KS',
  Ky = 'KY',
  La = 'LA',
  Ma = 'MA',
  Md = 'MD',
  Me = 'ME',
  Mi = 'MI',
  Mn = 'MN',
  Mo = 'MO',
  Ms = 'MS',
  Mt = 'MT',
  Nc = 'NC',
  Nd = 'ND',
  Ne = 'NE',
  Nh = 'NH',
  Nj = 'NJ',
  Nm = 'NM',
  Nv = 'NV',
  Ny = 'NY',
  Oh = 'OH',
  Ok = 'OK',
  Or = 'OR',
  Pa = 'PA',
  Ri = 'RI',
  Sc = 'SC',
  Sd = 'SD',
  Tn = 'TN',
  Tx = 'TX',
  Ut = 'UT',
  Va = 'VA',
  Vt = 'VT',
  Wa = 'WA',
  Wi = 'WI',
  Wv = 'WV',
  Wy = 'WY'
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Address: ResolverTypeWrapper<Address>;
  AddressInput: AddressInput;
  BasicQuery: ResolverTypeWrapper<BasicQuery>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateAddressInput: CreateAddressInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  NearEarthObject: ResolverTypeWrapper<NearEarthObject>;
  NearEarthObjectFeed: ResolverTypeWrapper<NearEarthObjectFeed>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  USState: UsState;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Address: Address;
  AddressInput: AddressInput;
  BasicQuery: BasicQuery;
  Boolean: Scalars['Boolean']['output'];
  CreateAddressInput: CreateAddressInput;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  Mutation: Record<PropertyKey, never>;
  NearEarthObject: NearEarthObject;
  NearEarthObjectFeed: NearEarthObjectFeed;
  Query: Record<PropertyKey, never>;
  String: Scalars['String']['output'];
}>;

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = ResolversObject<{
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['USState']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zipcode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type BasicQueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['BasicQuery'] = ResolversParentTypes['BasicQuery']> = ResolversObject<{
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createAddress?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<MutationCreateAddressArgs, 'addressInput'>>;
}>;

export type NearEarthObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['NearEarthObject'] = ResolversParentTypes['NearEarthObject']> = ResolversObject<{
  closeApproachDate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  estimatedDiameterMaxKm?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  estimatedDiameterMinKm?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isPotentiallyHazardousAsteroid?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  missDistanceKm?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  relativeVelocityKph?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export type NearEarthObjectFeedResolvers<ContextType = any, ParentType extends ResolversParentTypes['NearEarthObjectFeed'] = ResolversParentTypes['NearEarthObjectFeed']> = ResolversObject<{
  elementCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  objects?: Resolver<Maybe<Array<Maybe<ResolversTypes['NearEarthObject']>>>, ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<QueryAddressArgs, 'username'>>;
  nearEarthObjects?: Resolver<Maybe<ResolversTypes['NearEarthObjectFeed']>, ParentType, ContextType, RequireFields<QueryNearEarthObjectsArgs, 'endDate' | 'startDate'>>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Address?: AddressResolvers<ContextType>;
  BasicQuery?: BasicQueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NearEarthObject?: NearEarthObjectResolvers<ContextType>;
  NearEarthObjectFeed?: NearEarthObjectFeedResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

