import * as S from "components/Sidebar/AuthBid/styled";
import { useAuthContext } from "contexts/Auth";
import React from "react";

interface AuthBidProps {
	handleIsBidding: () => void;
}

export const AuthBid: React.FC<AuthBidProps> = ({ handleIsBidding }) => {
	const { auth, handleLogin } = useAuthContext();

	return (
		<>
			{auth.user ? (
				<S.Button onClick={handleIsBidding}>Place bid</S.Button>
			) : (
				<S.Button onClick={handleLogin}>{auth.authStep}</S.Button>
			)}
		</>
	);
};
