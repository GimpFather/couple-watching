import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NBButton from "~/components/NeoBrutalism/NBButton";
import showToast from "~/components/Toasts/showToast";
import { ChartLineIcon } from "@phosphor-icons/react";
import PhoneContainer from "~/components/Layout/PhoneContainer";

const StatisticsPage = () => {
	const handleStatisticsButton = () => {
		showToast({
			title: "Show me the statistics!",
			description: "You are now in the statistics! �",
			color: "success",
			sound: "MEME_ALERT_SHINE",
		});
	};

	return (
		<PhoneContainer>
			<Stack direction="column" gap={2}>
				<Typography variant="headingExtraLarge">Statistics</Typography>
				<Typography variant="bodyExtraLarge">This is the search! 🔍</Typography>
				<Divider />
				<Stack direction="row" gap={2}>
					<NBButton
						icon={<ChartLineIcon />}
						onClick={() => handleStatisticsButton()}
					>
						Show me the statistics!
					</NBButton>
				</Stack>
			</Stack>
		</PhoneContainer>
	);
};

export default StatisticsPage;
