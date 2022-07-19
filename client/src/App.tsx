import { Content } from "components/Content";
import { SiteWrapper } from "components/SiteWrapper";
import { Providers } from "contexts/Providers";
import { BrowserRouter as Router } from "react-router-dom";

export const App = () => {
	return (
		<Router>
			<Providers>
				<SiteWrapper>
					<Content />
				</SiteWrapper>
			</Providers>
		</Router>
	);
};
