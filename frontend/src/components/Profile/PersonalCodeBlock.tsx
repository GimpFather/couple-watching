import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import showToast from "../Toasts/showToast";

interface PersonalCodeBlockProps {
	personalCode: string;
}

const PersonalCodeBlock = ({ personalCode }: PersonalCodeBlockProps) => {
	const handleCopyCode = () => {
		navigator.clipboard.writeText(personalCode);
		showToast({
			title: "Code copied to clipboard",
			color: "success",
		});
	};
	return (
		<Stack
			sx={{
				width: "100%",
				backgroundColor: "primary.50",
				border: "1.5px solid",
				borderColor: "primary.600",
				borderRadius: "12px",
				padding: "12px",
			}}
		>
			<Stack direction="row" justifyContent="space-between">
				<Typography variant="emphasizedBodyMedium">
					Your personal code
				</Typography>
				<Typography
					variant="emphasizedBodyMedium"
					color="primary.600"
					sx={{ cursor: "pointer" }}
					onClick={() => handleCopyCode()}
				>
					Copy
				</Typography>
			</Stack>
			<Typography variant="headingLarge">{personalCode}</Typography>
		</Stack>
	);
};

export default PersonalCodeBlock;
