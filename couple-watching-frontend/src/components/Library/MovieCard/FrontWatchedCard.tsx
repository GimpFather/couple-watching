import { Stack, Typography, useTheme, Box } from "@mui/material";
import { WatchedMovie } from "../../../types/Watchlist.types";
import { FormattedMessage } from "react-intl";
import Button from "../../General/Button";
import OutlinedCard from "../../General/Cards/OutlinedCard";
import IconButton from "../../General/IconButton";
import { DeviceRotate } from "@phosphor-icons/react";
import WatchedRatingChip from "../../General/Chips/WatchedRatingChip";

type FrontWatchedCardProps = {
   movie: WatchedMovie;
   handleFlip: () => void;
   handleMarkAsWatched: () => void;
};

const FrontWatchedCard = ({ movie, handleFlip, handleMarkAsWatched }: FrontWatchedCardProps) => {
   const { palette } = useTheme();
   const genres = movie.genre.map((genre) => `#${genre.toLowerCase()}`).join(" ");
   const coverUrl = movie.cover.replace("SX300", "SX700");

   return (
      <OutlinedCard
         color="#F5C519"
         sx={{
            position: "absolute",
            backfaceVisibility: "hidden",
            width: 343,
            height: 508,
            overflow: "hidden",
            backgroundImage: `url(${coverUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundClip: "padding-box",
            placeContent: "end",
         }}
      >
         <Box sx={{ position: "absolute", top: 0, right: 0, backgroundColor: "#F5C519", borderBottomLeftRadius: 16 }}>
            <WatchedRatingChip rate={movie.rating.finalRating} />
         </Box>
         <Stack
            justifyContent="flex-end"
            sx={{
               height: "50%",
               padding: 1.5,
               background: " linear-gradient(180deg, rgba(12, 12, 12, 0.00) 0%, #0C0C0C 75%, #0C0C0C 100%);",
            }}
         >
            <Stack spacing={2}>
               <Stack spacing={0.5}>
                  <Typography variant="headingLarge" color="text.secondary" sx={{ fontWeight: "bold" }}>
                     {movie.title}
                  </Typography>
                  <Typography variant="bodyMedium" color="grey.500">
                     {genres}
                  </Typography>
               </Stack>
               <Stack direction="row" spacing={1}>
                  <Button color="accent" onClick={() => handleMarkAsWatched()} fullWidth>
                     <FormattedMessage id="LIBRARY.WATCHED.CARD.BUTTON.PRIMARY" />
                  </Button>
                  <IconButton color="accent" onClick={() => handleFlip()}>
                     <DeviceRotate style={{ color: palette.text.primary }} />
                  </IconButton>
               </Stack>
            </Stack>
         </Stack>
      </OutlinedCard>
   );
};

export default FrontWatchedCard;
