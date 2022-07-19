import * as S from "components/Input/styled";
import React from "react";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {}

export const Input: React.FC<InputProps> = ({ ...props }) => {
	return <S.Input {...props} />;
};
