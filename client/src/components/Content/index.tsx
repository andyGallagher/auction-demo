import { BlurWrapper } from "components/BlurWrapper";
import { Header } from "components/Header";
import { Paintings } from "components/Paintings";
import { Profile } from "components/Profile";
import { Sidebar } from "components/Sidebar";
import { useActiveImageContext } from "contexts/ActiveImage";

export const Content = () => {
	const { activeImage } = useActiveImageContext();

	return (
		<>
			<BlurWrapper>
				<Header />
				<Paintings />
				<Profile />
			</BlurWrapper>

			{activeImage !== undefined && <Sidebar painting={activeImage} />}
		</>
	);
};
