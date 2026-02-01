import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import ToolbarItem from "~/components/Layout/Toolbar/ToolbarItem";
import { useLocation } from "react-router";
import { useNavigationTransition } from "~/hooks/useNavigationTransition";
import {
	HouseLineIcon,
	FilmReelIcon,
	ProjectorScreenChartIcon,
	type IconProps,
} from "@phosphor-icons/react";
import { motion } from "motion/react";
import Box from "@mui/material/Box";
import AvatarsDuoToolbar from "~/components/Avatar/AvatarsDuoToolbar";
import { useGetMyPairWithProfiles } from "~/api/hooks/pairs";
import { useRequiredAuth } from "~/context/auth/useRequiredAuth";

const Toolbar = () => {
	const { id: authId } = useRequiredAuth();
	const { data: pairData } = useGetMyPairWithProfiles(authId);
	const { pathname } = useLocation();
	const { palette } = useTheme();
	const handleNavigationTransition = useNavigationTransition();

	const getIcon = (label: string, active: boolean) => {
		const color = active ? palette.primary.main : palette.common.black;
		const weight = active ? "duotone" : "regular";
		const iconProps: IconProps = {
			weight,
			fill: color,
			size: 24,
			className: "overwrite-toolbar-icon",
		};

		switch (label) {
			case "Home":
				return <HouseLineIcon {...iconProps} />;
			case "Watchlist":
				return <FilmReelIcon {...iconProps} />;
			case "Statistics":
				return <ProjectorScreenChartIcon {...iconProps} />;
			case "Couple":
				return (
					<AvatarsDuoToolbar
						avatarSeedOne={pairData?.myAvatarSeed ?? ""}
						avatarSeedTwo={pairData?.partnerAvatarSeed ?? ""}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<Box sx={{ paddingTop: "64px" }}>
			<Stack
				component={motion.div}
				initial={{ y: "100%" }}
				animate={{ y: 0 }}
				exit={{ y: "100%" }}
				transition={{
					duration: 0.3,
					ease: [0.87, 0, 0.13, 1],
				}}
				direction="row"
				justifyContent="space-around"
				alignItems="center"
				sx={{
					position: "fixed",
					bottom: 0,
					left: 0,
					right: 0,
					padding: "6px 8px",
					backgroundColor: palette.background.paper,
					borderTop: `1px solid ${palette.accent.main}`,
				}}
			>
				<ToolbarItem
					label="Home"
					icon={getIcon("Home", pathname === "/home")}
					onClick={() => handleNavigationTransition("/home")}
					active={pathname === "/home"}
				/>
				<ToolbarItem
					label="Watchlist"
					icon={getIcon("Watchlist", pathname === "/watchlist")}
					onClick={() => handleNavigationTransition("/watchlist")}
					active={pathname === "/watchlist"}
				/>
				<ToolbarItem
					label="Statistics"
					icon={getIcon("Statistics", pathname === "/statistics")}
					onClick={() => handleNavigationTransition("/statistics")}
					active={pathname === "/statistics"}
				/>
				<ToolbarItem
					label="Couple"
					icon={getIcon("Couple", pathname === "/couple")}
					onClick={() => handleNavigationTransition("/couple")}
					active={pathname === "/couple"}
				/>
			</Stack>
		</Box>
	);
};

export default Toolbar;
