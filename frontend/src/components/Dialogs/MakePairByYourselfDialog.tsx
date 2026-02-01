import { useState } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NBModal from "~/components/NeoBrutalism/NBModal";
import NBTextField from "~/components/NeoBrutalism/NBTextField";
import NBButton from "~/components/NeoBrutalism/NBButton";
import type { DialogProps } from "~/components/Dialogs/dialogs.types";
import { useHandlePairByYourself } from "~/api/hooks/pairs";
import showToast from "../Toasts/showToast";
import { generateAvatarSeed } from "~/utils/utils";

const MakePairByYourselfDialog = ({
	open,
	onClose,
	ownerProfileId,
}: DialogProps & { ownerProfileId: string }) => {
	const { mutate: mutateHandlePairByYourself } = useHandlePairByYourself();

	const [displayName, setDisplayName] = useState("");

	const disableSubmit = !displayName;

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		mutateHandlePairByYourself(
			{
				firstProfileId: ownerProfileId,
				secondDisplayName: displayName,
				secondAvatarSeed: generateAvatarSeed(),
			},
			{
				onSuccess: () => {
					handleClose();
				},
				onError: (error) => {
					showToast({
						title: "🤔 Something went wrong.",
						color: "danger",
						description: error.message,
					});
				},
			},
		);
	};

	const handleClose = () => {
		setDisplayName("");
		onClose();
	};

	return (
		<NBModal
			open={open}
			onClose={handleClose}
			children={
				<Stack
					component="form"
					onSubmit={handleSubmit}
					direction="column"
					gap="16px"
				>
					<Typography variant="headingLarge">
						At least tell us your partner’s name!
					</Typography>
					<Stack direction="column" gap="12px">
						<Typography variant="bodyMedium">
							If your partner doesn’t want to download the app or maybe they are
							just too lazy to do it, you can create a pair managed by yourself.
						</Typography>
						<Typography variant="bodyMedium">
							You will be able to add ratings, comments and other things for
							both of you. Your partner will be able to join your pair if they
							ever change their mind.
						</Typography>
						<Stack>
							<Typography variant="bodyMedium">Partner’s name</Typography>
							<NBTextField
								placeholder="Tell us your partner’s name"
								value={displayName}
								onChange={(event) => setDisplayName(event.target.value)}
							/>
						</Stack>
					</Stack>
					<Stack direction="row" gap="12px">
						<NBButton onClick={handleClose} color="accent" fullWidth>
							Go back
						</NBButton>
						<NBButton type="submit" disabled={disableSubmit} fullWidth>
							Fine! Let me in!
						</NBButton>
					</Stack>
				</Stack>
			}
		/>
	);
};

export default MakePairByYourselfDialog;
