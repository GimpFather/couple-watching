import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import NBCard from "../NeoBrutalism/NBCard";
import type { MovieSearch } from "~/api/types/omdb";
import NBButton from "../NeoBrutalism/NBButton";
import NBIconButton from "../NeoBrutalism/NBIconButton";
import { DeviceRotateIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import type { MarkAsWatchedMovie } from "../Dialogs/dialogs.types";

type MovieCardProps = {
	movie: MovieSearch;
	index: number;
	onMarkAsWatched: (movie: MarkAsWatchedMovie) => void;
};

const MovieCard = ({ movie, index, onMarkAsWatched }: MovieCardProps) => {
	const optimizedPoster = movie.poster.replace("_SX300.", "_SX600.");

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{
				duration: 0.3,
				ease: [0.87, 0, 0.13, 1],
				delay: index * 0.1,
			}}
		>
			<NBCard disableShadow sx={{ padding: "2.5px", height: 500, width: 344 }}>
				<Stack
					direction="column"
					justifyContent="flex-end"
					gap={1}
					sx={{
						padding: "12px",
						backgroundImage: `linear-gradient(180deg, rgba(12, 12, 12, 0) 0%, #0C0C0C 95%, #0C0C0C 100%), url(${optimizedPoster})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						height: "100%",
						width: "100%",
						borderRadius: "12px",
					}}
				>
					<Stack justifyContent="space-between" gap={1.5}>
						<Typography variant="headingLarge" color="common.white">
							{movie.title}
						</Typography>
						<Stack direction="row" gap={1}>
							<NBButton
								fullWidth
								onClick={() =>
									onMarkAsWatched({ id: movie.imdbID, title: movie.title })
								}
							>
								Add to watchlist
							</NBButton>
							<NBIconButton
								color="accent"
								icon={<DeviceRotateIcon />}
								onClick={() => {}}
							/>
						</Stack>
					</Stack>
				</Stack>
			</NBCard>
		</motion.div>
	);
};

export default MovieCard;
