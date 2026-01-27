import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import NBCard from "../NeoBrutalism/NBCard";
import type { MovieSearch } from "~/api/types/omdb";
import NBButton from "../NeoBrutalism/NBButton";
import NBIconButton from "../NeoBrutalism/NBIconButton";
import { DeviceRotateIcon } from "@phosphor-icons/react";

const MovieCard = ({ movie }: { movie: MovieSearch }) => {
    const optimizedPoster = movie.poster.replace("_SX300.", "_SX600.");

    return (
        <NBCard disableShadow sx={{ padding: '2.5px', height: 500, width: 344 }}>
            <Stack direction="column" justifyContent='flex-end' gap={1} sx={{
                padding: '12px',
                backgroundImage: `linear-gradient(180deg, rgba(12, 12, 12, 0) 0%, #0C0C0C 95%, #0C0C0C 100%), url(${optimizedPoster})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100%",
                width: "100%",
                borderRadius: "12px",
            }}>
                <Stack justifyContent="space-between" gap={1.5}>
                    <Typography variant="headingLarge" color="common.white">
                        {movie.title}
                    </Typography>
                    <Stack direction="row" gap={1}>
                        <NBButton fullWidth>
                            Add to watchlist
                        </NBButton>
                        <NBIconButton color="accent" icon={<DeviceRotateIcon />} onClick={() => { }} />
                    </Stack>
                </Stack>
            </Stack>
        </NBCard>
    );
};

export default MovieCard;