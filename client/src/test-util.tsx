import { MockedProvider } from "@apollo/client/testing";
import { render, RenderOptions } from "@testing-library/react";
import { mocks } from "__mocks__/graphql";
import { ActiveImageProvider } from "contexts/ActiveImage";
import { AuthContextProvider } from "contexts/Auth";
import React, { ReactElement } from "react";
import { ToastProvider } from "react-toast-notifications";

export const Providers: React.FC = ({ children }) => {
	return (
		<MockedProvider mocks={mocks} addTypename={false}>
			<ToastProvider>
				<AuthContextProvider
					authOverride={{
						authStep: "TESTING",
						error: undefined,
						user: {
							address:
								"0x0000000000000000000000000000000000000000",
							id: "9737bbe2-51bf-405d-8f6c-aaa1899367cf",
							token: "token",
						},
					}}
				>
					<ActiveImageProvider>{children}</ActiveImageProvider>
				</AuthContextProvider>
			</ToastProvider>
		</MockedProvider>
	);
};

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";
export { customRender as render };
