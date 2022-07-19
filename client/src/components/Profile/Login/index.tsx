import * as S from "components/Profile/Login/styled";
import { useAuthContext } from "contexts/Auth";
import React from "react";

export const Login: React.FC = () => {
	const { auth, handleLogin } = useAuthContext();

	return <S.Button onClick={handleLogin}>{auth.authStep}</S.Button>;
};
