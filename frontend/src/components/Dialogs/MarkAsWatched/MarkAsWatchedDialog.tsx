import { Stack, Typography } from "@mui/material";
import NBModal from "../../NeoBrutalism/NBModal";
import type { MarkAsWatchedDialogProps } from "../dialogs.types";
import NBButton from "../../NeoBrutalism/NBButton";
import { useState } from "react";
import dayjs from "dayjs";
import WatchedDateInput from "./WatchedDateInput";
import RatingInput from "./RatingInput";
import { AnimatePresence, motion } from "framer-motion";
import WatchedTags from "./WatchedTags";
import WatchedNotes from "./WatchedNotes";

const MarkAsWatchedDialog = ({
	open,
	onClose,
	selectedMovie,
}: MarkAsWatchedDialogProps) => {
	const { id, title } = selectedMovie ?? {};

	const [watchedDate, setWatchedDate] = useState<dayjs.Dayjs>(dayjs());
	const [partnerRating, setPartnerRating] = useState<number>(0);
	const [myRating, setMyRating] = useState<number>(0);

	const [currentStep, setCurrentStep] = useState<number>(0);

	const steps = [
		{
			content: (
				<Stack direction="column" gap={2}>
					<Typography variant="headingLarge">{title}</Typography>
					<Typography variant="bodyMedium" sx={{ fontStyle: "italic" }}>
						Awesome! You're about to tick that movie off your watchlist! Let’s
						rate it and spill the tea – what did you think?
					</Typography>
					<WatchedDateInput
						selectedDate={watchedDate}
						setSelectedDate={setWatchedDate}
					/>
					<RatingInput
						partnerRating={partnerRating}
						myRating={myRating}
						setPartnerRating={setPartnerRating}
						setMyRating={setMyRating}
					/>
				</Stack>
			),
			actions: {
				next: {
					label: "Next step",
					onClick: () => setCurrentStep(currentStep + 1),
				},
				back: {
					label: "Go back",
					onClick: () => {
						onClose();
						setCurrentStep(0);
					},
				},
			},
		},
		{
			content: (
				<Stack direction="column" gap={2}>
					<Typography variant="headingLarge">{title}</Typography>
					<Typography variant="bodyMedium" sx={{ fontStyle: "italic" }}>
						Let’s add some tags together! They’re optional, but with them you’ll
						get even cooler stats!
					</Typography>
					<WatchedTags />
					<WatchedNotes />
				</Stack>
			),
			actions: {
				next: {
					label: "Submit",
					onClick: () => {
						console.log("submit", id, watchedDate, partnerRating, myRating);
						onClose();
					},
				},
				back: {
					label: "Go back",
					onClick: () => setCurrentStep(currentStep - 1),
				},
			},
		},
	];

	return (
		<NBModal open={open} onClose={onClose}>
			<Stack direction="column" gap={2}>
				<AnimatePresence mode="wait" initial>
					{steps[currentStep] && (
						<motion.div
							key={currentStep}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3, ease: [0.87, 0, 0.13, 1] }}
						>
							{steps[currentStep].content}
						</motion.div>
					)}
				</AnimatePresence>
				<Stack direction="row" gap={1} sx={{ width: "100%" }}>
					<NBButton
						color="accent"
						onClick={steps[currentStep].actions.back.onClick}
						fullWidth
					>
						{steps[currentStep].actions.back.label}
					</NBButton>
					<NBButton onClick={steps[currentStep].actions.next.onClick} fullWidth>
						{steps[currentStep].actions.next.label}
					</NBButton>
				</Stack>
			</Stack>
		</NBModal>
	);
};

export default MarkAsWatchedDialog;
