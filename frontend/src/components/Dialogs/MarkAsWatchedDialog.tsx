import { Stack, Typography } from "@mui/material";
import NBModal from "../NeoBrutalism/NBModal";
import type { MarkAsWatchedDialogProps } from "./dialogs.types";
import NBButton from "../NeoBrutalism/NBButton";
import WatchedDateInput from "../WatchlistPage/WatchedDateInput";
import { useState } from "react";
import dayjs from "dayjs";

const MarkAsWatchedDialog = ({ open, onClose, selectedMovie }: MarkAsWatchedDialogProps) => {

    const { id, title } = selectedMovie ?? {};

    const [watchedDate, setWatchedDate] = useState<dayjs.Dayjs>(dayjs());

    const handleTestSubmit = () => {
        console.log('watched date', watchedDate.format('DD.MM.YYYY'));
        console.log('movie id', id);
        console.log('movie title', title);
        onClose();
    };

    return (
        <NBModal open={open} onClose={onClose}>
            <Stack direction="column" gap={2}>
                <Stack direction="column" gap={2}>
                    <Typography variant="headingLarge">{title}</Typography>
                    <Typography variant="bodyMedium" sx={{ fontStyle: "italic" }}>Awesome! You're about to tick that movie off your watchlist! Let’s rate it and spill the tea – what did you think?</Typography>
                    <WatchedDateInput selectedDate={watchedDate} setSelectedDate={setWatchedDate} />
                </Stack>
                <Stack direction="row" gap={1} sx={{ width: "100%" }}>
                    <NBButton color="accent" onClick={onClose} fullWidth>Go back</NBButton>
                    <NBButton onClick={handleTestSubmit} fullWidth>Next step</NBButton>
                </Stack>
            </Stack>
        </NBModal>
    );
};

export default MarkAsWatchedDialog;