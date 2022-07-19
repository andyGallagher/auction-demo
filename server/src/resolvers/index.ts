import { GQLResolvers } from "@/@graphql";
import { pubsub } from "@/common/pubsub";
import { mutations } from "@/resolvers/mutations";
import { queries } from "@/resolvers/queries";

export const resolvers: GQLResolvers = {
	Query: {
		...queries,
	},
	Mutation: {
		...mutations,
	},
	Subscription: {
		bidReceived: {
			subscribe: async () => {
				return pubsub.asyncIterator([
					"BID_CREATED",
				]) as unknown as AsyncIterable<any>;
			},
		},
	},
};
