import {
	GQLAuthUser,
	useNonceAssignmentMutation,
	useValidateWalletLazyQuery,
} from "@graphql";
import { ethers } from "ethers";
import { createContext, useContext, useState } from "react";
import { useToasts } from "react-toast-notifications";

interface AuthContextProps {
	auth: {
		authStep: string;
		error?: string;
		user?: GQLAuthUser;
	};
	handleLogin: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextProps>({
	auth: {
		authStep: "Login",
	},
	handleLogin: async () => {},
});

interface AuthContextProviderProps {
	authOverride?: AuthContextProps["auth"];
}
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
	children,
	authOverride,
}) => {
	const [auth, setAuth] = useState<AuthContextProps["auth"]>(
		authOverride ?? {
			authStep: "Login",
			error: undefined,
			user: undefined,
		}
	);
	const { addToast } = useToasts();

	const [nonceAssignment] = useNonceAssignmentMutation();
	const [validateWallet] = useValidateWalletLazyQuery();

	const handleLogin = async () => {
		try {
			if (!window.ethereum) {
				throw new Error("No ethereum wallet detected");
			}

			const provider = new ethers.providers.Web3Provider(
				window.ethereum as any
			);

			setAuth((auth) => ({
				...auth,
				authStep: "Requesting accounts",
			}));

			await provider.send("eth_requestAccounts", []);
			const signer = provider.getSigner();

			const walletAddress = await signer.getAddress();

			const nonceAssignmentResult = await nonceAssignment({
				variables: {
					input: {
						walletAddress,
					},
				},
			});

			if (nonceAssignmentResult.data) {
				setAuth((auth) => ({
					...auth,
					authStep: "Awaiting signature",
				}));

				const signature = await signer.signMessage(
					nonceAssignmentResult.data.nonceAssignment.nonce
				);

				setAuth((auth) => ({
					...auth,
					authStep: "Validating nonce",
				}));

				const validateWalletResult = await validateWallet({
					variables: {
						input: {
							condition: {
								address: walletAddress,
								signature,
								nonce: nonceAssignmentResult.data
									.nonceAssignment.nonce,
							},
						},
					},
				});

				if (validateWalletResult.data) {
					setAuth((auth) => ({
						...auth,
						user: validateWalletResult.data?.validateWallet,
					}));
				} else {
					throw new Error(
						validateWalletResult.error?.message ||
							"Error: could not validate nonce signature"
					);
				}
			} else {
				throw new Error("Error: could not assign nonce.");
			}
		} catch (e) {
			let errorMessage = `${e}`;

			if ((e as any)?.message) {
				errorMessage = (e as any)?.message;
			}

			setAuth((auth) => ({
				...auth,
				authStep: errorMessage,
				error: errorMessage,
			}));

			addToast(`${errorMessage}`, {
				appearance: "error",
				autoDismiss: true,
			});
		}
	};

	return (
		<AuthContext.Provider value={{ auth, handleLogin }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => useContext(AuthContext);
