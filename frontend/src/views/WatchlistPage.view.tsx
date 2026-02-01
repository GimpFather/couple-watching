import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PlusCircleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useGetOMDbSearchForMovies } from "~/api/hooks/omdb";
import PhoneContainer from "~/components/Layout/PhoneContainer";
import NBIconButton from "~/components/NeoBrutalism/NBIconButton";
import NBSearchBox from "~/components/NeoBrutalism/NBSearchBox";
import NBChip from "~/components/NeoBrutalism/NBChip";
import { playSound } from "~/hooks/useSound";
import MovieCard from "~/components/WatchlistPage/MovieCard";
import { AnimatePresence } from "motion/react";
import MovieCardSkeleton from "~/components/WatchlistPage/MovieCardSkeleton";
import MarkAsWatchedDialog from "~/components/Dialogs/MarkAsWatched/MarkAsWatchedDialog";
import type { MarkAsWatchedMovie } from "~/components/Dialogs/dialogs.types";

const WatchlistPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedMovie, setSelectedMovie] = useState<MarkAsWatchedMovie | null>(
		null,
	);

	const { data: omdbSearchData, isLoading: isLoadingOMDbSearch } =
		useGetOMDbSearchForMovies({ title: searchTerm });

	const [selectedChip, setSelectedChip] = useState(["All"]);

	const handleChipClick = (chip: string) => {
		if (isChipSelected(chip)) {
			setSelectedChip(selectedChip.filter((c) => c !== chip));
			playSound("BUTTON_CLICK_START");
		} else {
			setSelectedChip([...selectedChip, chip]);
			playSound("BUTTON_CLICK_END");
		}
	};

	const isChipSelected = (chip: string) => {
		return selectedChip.includes(chip);
	};

	return (
		<PhoneContainer>
			<Stack direction="column" gap={2} sx={{ paddingBottom: "20px" }}>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Typography variant="headingExtraLarge">Watchlist</Typography>
					<NBIconButton icon={<PlusCircleIcon />} />
				</Stack>
				<NBSearchBox
					placeholder="Search in watchlist"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<Stack direction="row" gap={2} sx={{ overflowX: "auto" }}>
					<NBChip
						label="All"
						onClick={() => handleChipClick("All")}
						active={selectedChip.includes("All")}
					/>
					<NBChip
						label="Movies"
						onClick={() => handleChipClick("Movies")}
						active={selectedChip.includes("Movies")}
					/>
					<NBChip
						label="Series"
						onClick={() => handleChipClick("Series")}
						active={selectedChip.includes("Series")}
					/>
				</Stack>
			</Stack>
			<Stack direction="column" gap={2} alignItems="center">
				<AnimatePresence initial={true}>
					{isLoadingOMDbSearch ? (
						<MovieCardSkeleton />
					) : (
						<>
							{omdbSearchData?.map(
								(movie, index) =>
									movie && (
										<MovieCard
											key={index}
											movie={movie}
											index={index}
											onMarkAsWatched={(movie: MarkAsWatchedMovie) =>
												setSelectedMovie(movie)
											}
										/>
									),
							)}
						</>
					)}
				</AnimatePresence>
			</Stack>
			<MarkAsWatchedDialog
				open={!!selectedMovie}
				onClose={() => setSelectedMovie(null)}
				selectedMovie={selectedMovie}
			/>
		</PhoneContainer>
	);
};

export default WatchlistPage;
