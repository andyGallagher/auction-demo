import { GQLPainting } from "@graphql";
import { createContext, useContext, useState } from "react";

interface ActiveImageContextProps {
	activeImage: GQLPainting | undefined;
	setActiveImage: React.Dispatch<
		React.SetStateAction<GQLPainting | undefined>
	>;
}
export const ActiveImageContext = createContext<ActiveImageContextProps>({
	activeImage: undefined,
	setActiveImage: () => {},
});

export const ActiveImageProvider: React.FC = ({ children }) => {
	const [activeImage, setActiveImage] = useState<GQLPainting | undefined>(
		undefined
	);

	return (
		<ActiveImageContext.Provider value={{ activeImage, setActiveImage }}>
			{children}
		</ActiveImageContext.Provider>
	);
};

export const useActiveImageContext = () => useContext(ActiveImageContext);
