import * as S from "components/Button/styled";
import React from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {}

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
	return <S.ButtonContainer {...props}>{children}</S.ButtonContainer>;
};
