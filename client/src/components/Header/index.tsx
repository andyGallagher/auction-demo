import logoSrc from "assets/logo.png";
import { DesktopNav } from "components/Header/DesktopNav";
import { MobileNav } from "components/Header/MobileNav";
import * as S from "components/Header/styled";
import { config } from "config";

export const Header = () => {
	return (
		<S.HeaderContainer>
			<MobileNav />
			<S.LogoHeader>
				<S.HeaderWrapper>
					<S.LogoLink href={config.flagshipURL}>
						<S.Logo alt="logo" src={logoSrc} />
					</S.LogoLink>
				</S.HeaderWrapper>
			</S.LogoHeader>
			<DesktopNav />
		</S.HeaderContainer>
	);
};
