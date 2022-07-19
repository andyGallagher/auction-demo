import { PaintingsDocument } from "@graphql";

export const mocks = [
	{
		request: {
			query: PaintingsDocument,
			variables: {
				input: {},
			},
		},
		result: {
			data: {
				paintings: {
					edges: [
						{
							node: {
								id: "91914d2f-7b29-4e83-9559-0ca139560773",
								name: "Reflection: Cody Mayer X Brian T.",
								description:
									"Welcome to Mirrored, a world of never ending sunsets and sunrises to get lost in. Mint your own endless sky below and enjoy your stay 🤍.",
								tokenID: 0,
								start: "2022-02-07 19:46:32.668536+00",
								topBid: {
									ownerAddress:
										"0x21868fCb0D4b262F72e4587B891B4Cf081232726",
									amount: 222,
									__typename: "TopBid",
								},
								__typename: "Painting",
							},
							__typename: "PaintingEdge",
						},
						{
							node: {
								id: "a86e56c0-f9e0-4acb-a406-904202a5b3ce",
								name: "Reflection: Cody Mayer X Casara",
								description:
									"Welcome to Mirrored, a world of never ending sunsets and sunrises to get lost in. Mint your own endless sky below and enjoy your stay 🤍.",
								tokenID: 1,
								start: "2022-02-07 19:46:32.668536+00",
								topBid: {
									ownerAddress:
										"0x21868fCb0D4b262F72e4587B891B4Cf081232726",
									amount: 18,
									__typename: "TopBid",
								},
								__typename: "Painting",
							},
							__typename: "PaintingEdge",
						},
						{
							node: {
								id: "06530aa0-f02b-48cf-b6a5-69c881486b48",
								name: "Reflection: Cody Mayer X Chad",
								description:
									"Welcome to Mirrored, a world of never ending sunsets and sunrises to get lost in. Mint your own endless sky below and enjoy your stay 🤍.",
								tokenID: 2,
								start: null,
								topBid: {
									ownerAddress: "0x0",
									amount: 0.22,
									__typename: "TopBid",
								},
								__typename: "Painting",
							},
							__typename: "PaintingEdge",
						},
						{
							node: {
								id: "14c115e1-7b2e-423a-a4d2-5d96eb9fbd8e",
								name: "Reflection: Cody Mayer X Courtney W.",
								description:
									"Welcome to Mirrored, a world of never ending sunsets and sunrises to get lost in. Mint your own endless sky below and enjoy your stay 🤍.",
								tokenID: 3,
								start: null,
								topBid: {
									ownerAddress:
										"0x21868fCb0D4b262F72e4587B891B4Cf081232726",
									amount: 0.4,
									__typename: "TopBid",
								},
								__typename: "Painting",
							},
							__typename: "PaintingEdge",
						},
						{
							node: {
								id: "c52c2908-cb17-491a-b061-f384481d6495",
								name: "Reflection: Cody Mayer X Emillie",
								description:
									"Welcome to Mirrored, a world of never ending sunsets and sunrises to get lost in. Mint your own endless sky below and enjoy your stay 🤍.",
								tokenID: 4,
								start: null,
								topBid: {
									ownerAddress:
										"0x21868fCb0D4b262F72e4587B891B4Cf081232726",
									amount: 2,
									__typename: "TopBid",
								},
								__typename: "Painting",
							},
							__typename: "PaintingEdge",
						},
					],
				},
			},
		},
	},
];
