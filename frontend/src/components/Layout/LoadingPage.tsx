import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {
	HourglassHighIcon,
	HourglassLowIcon,
	HourglassMediumIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const LoadingPage = () => {
	const theme = useTheme();
	const [iconIndex, setIconIndex] = useState(0);

	const icons = [
		<HourglassHighIcon
			size={100}
			key="hourglass-high"
			weight="duotone"
			color={theme.palette.primary.main}
		/>,
		<HourglassMediumIcon
			size={100}
			key="hourglass-medium"
			weight="duotone"
			color={theme.palette.primary.main}
		/>,
		<HourglassLowIcon
			size={100}
			key="hourglass-low"
			weight="duotone"
			color={theme.palette.primary.main}
		/>,
		<HourglassLowIcon
			size={100}
			key="hourglass"
			style={{ rotate: "45deg" }}
			weight="duotone"
			color={theme.palette.primary.main}
		/>,
		<HourglassLowIcon
			size={100}
			key="hourglass"
			style={{ rotate: "90deg" }}
			weight="duotone"
			color={theme.palette.primary.main}
		/>,
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setIconIndex((prev) => (prev + 1) % icons.length);
		}, 150);

		return () => clearInterval(interval);
	}, [icons.length]);

	return (
		<Stack
			component={motion.div}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3, ease: [0.87, 0, 0.13, 1] }}
			direction="column"
			gap={2}
			alignItems="center"
			sx={{ height: "100vh", justifyContent: "center" }}
		>
			{icons[iconIndex]}
			<Typography variant="headingLarge">Loading...</Typography>
		</Stack>
	);
};

export default LoadingPage;
