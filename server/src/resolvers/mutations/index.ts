import { GQLMutationResolvers } from "@/@graphql";
import * as auth from "@/resolvers/mutations/auth";
import * as bids from "@/resolvers/mutations/bids";

export const mutations: GQLMutationResolvers<any, {}> = {
	...auth,
	...bids,
};
