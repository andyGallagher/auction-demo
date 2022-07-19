import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "common/apolloClient";
import { ActiveImageProvider } from "contexts/ActiveImage";
import { AuthContextProvider } from "contexts/Auth";
import React from "react";
import { ToastProvider } from "react-toast-notifications";

export const Providers: React.FC = ({ children }) => {
	return (
		<ApolloProvider client={apolloClient}>
			<ToastProvider>
				<AuthContextProvider>
					<ActiveImageProvider>{children}</ActiveImageProvider>
				</AuthContextProvider>
			</ToastProvider>
		</ApolloProvider>
	);
};
