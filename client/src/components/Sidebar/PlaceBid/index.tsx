import {
	BidsDocument,
	GQLPainting,
	PaintingDocument,
	PaintingsDocument,
	useBidAssignmentMutation,
} from "@graphql";
import { Button } from "components/Button";
import { CenterEllipsis } from "components/CenterEllipsis";
import { Input } from "components/Input";
import * as S from "components/Sidebar/PlaceBid/styled";
import { config } from "config";
import { useAuthContext } from "contexts/Auth";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";

interface PlaceBidProps {
	painting: GQLPainting;
}
export const PlaceBid: React.FC<PlaceBidProps> = ({ painting }) => {
	const { auth } = useAuthContext();
	const [bidPrice, setBidPrice] = useState<string | undefined>("");
	const { addToast } = useToasts();
	const [balance, setBalance] = useState<string | undefined>(undefined);

	const [assignBid] = useBidAssignmentMutation();

	useEffect(() => {
		(async () => {
			const getWalletBalance = async () => {
				if (window.ethereum && auth.user) {
					const provider = new ethers.providers.Web3Provider(
						window.ethereum as any
					);

					const ethBalance = await provider.getBalance(
						auth.user.address
					);
					return ethers.utils.formatEther(ethBalance);
				}
			};

			const balance = await getWalletBalance();
			if (balance) {
				setBalance(balance);
			}
		})();
	}, [auth.user]);

	const handleBid = async () => {
		if (!auth.user) {
			addToast("Not signed in.  Please refresh and log in to bid.", {
				appearance: "error",
				autoDismiss: true,
			});
		}

		if (!bidPrice || isNaN(parseFloat(bidPrice))) {
			addToast(`Error, invalid bid price`, {
				appearance: "error",
				autoDismiss: true,
			});

			return;
		}

		if (
			bidPrice &&
			parseFloat(bidPrice) < (painting.topBid?.amount || config.reserve)
		) {
			addToast(
				`Bid price too low, current bid is ${
					painting.topBid?.amount
						? painting.topBid?.amount
						: config.reserve
				}Ξ.  A bid of ${
					painting.topBid?.amount
						? painting.topBid?.amount * 1.05
						: config.reserve
				}Ξ (5% increase) will replace the highest bid.`,
				{
					appearance: "error",
					autoDismiss: true,
				}
			);

			return;
		}

		if (balance && parseFloat(bidPrice) > parseFloat(balance)) {
			addToast(
				`Balance too low.  Current balance of ${parseFloat(
					balance
				).toFixed(
					4
				)}Ξ does not meet minimum bid price of ${bidPrice}Ξ.`,
				{
					appearance: "error",
					autoDismiss: true,
				}
			);

			return;
		}

		if (bidPrice && auth.user) {
			try {
				await assignBid({
					variables: {
						input: {
							ownerAddress: auth.user.address,
							amount: parseFloat(bidPrice),
							paintingID: painting.id,
						},
					},
					refetchQueries: [
						BidsDocument,
						PaintingDocument,
						PaintingsDocument,
					],
					context: {
						headers: {
							authorization: auth.user.token,
						},
					},
				});

				addToast(`Bid placed for ${bidPrice}`, {
					appearance: "success",
					autoDismiss: true,
				});
			} catch (e) {
				addToast(`${e}`, {
					appearance: "error",
					autoDismiss: true,
				});
			}
		}
	};

	return (
		<S.PlaceBid>
			<S.BidSection>
				<S.InputWrapper>
					<Input
						autoFocus
						placeholder="0"
						value={bidPrice}
						onChange={(e) => {
							if (e.target.value === "") {
								setBidPrice("");
							}

							const re = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;
							if (re.test(e.target.value)) {
								setBidPrice(e.target.value);
							}
						}}
					/>
					<S.EthereumIcon />
				</S.InputWrapper>
				<Button disabled={bidPrice === undefined} onClick={handleBid}>
					Bid
				</Button>
			</S.BidSection>
			{painting.topBid?.amount && painting.topBid?.ownerAddress ? (
				<S.Disclaimer>
					<S.CurrentPrice>
						<S.CurrentBid>
							Current bid: {painting.topBid.amount}Ξ by{" "}
						</S.CurrentBid>
						<CenterEllipsis text={painting.topBid.ownerAddress} />
					</S.CurrentPrice>
					<S.CurrentPrice>
						Minimum bid:{" "}
						{(painting.topBid.amount * 1.05).toFixed(4)}Ξ
					</S.CurrentPrice>
					{balance && (
						<S.CurrentPrice>
							Current balance: {parseFloat(balance).toFixed(4)}Ξ
						</S.CurrentPrice>
					)}
				</S.Disclaimer>
			) : (
				<S.Disclaimer>Reserve: {config.reserve}Ξ</S.Disclaimer>
			)}
		</S.PlaceBid>
	);
};
