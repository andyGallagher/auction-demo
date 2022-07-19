import * as auth from "@/resolvers/queries/auth";
import * as bids from "@/resolvers/queries/bids";
import * as paintings from "@/resolvers/queries/paintings";

export const queries = {
	...auth,
	...bids,
	...paintings,
};
