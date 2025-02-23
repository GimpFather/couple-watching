import { Stack, Typography } from "@mui/material";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { Movie } from "../../../types/Watchlist.types";
import { FormattedMessage } from "react-intl";
import Button from "../../General/Button";
import OutlinedCard from "../../General/OutlinedCard";
import IconButton from "../../General/IconButton";
import { DeviceRotate } from "@phosphor-icons/react";

type FrontCardProps = {
   movie: Movie;
   handleFlip: () => void;
   handleMarkAsWatched: () => void;
};

const FrontCard = ({ movie, handleFlip, handleMarkAsWatched }: FrontCardProps) => {
   return (
      <OutlinedCard
         sx={{
            position: "absolute",
            backfaceVisibility: "hidden",
            width: 343,
            height: 508,
            overflow: "hidden",
            backgroundImage: `url(${movie.cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundClip: "padding-box",
            placeContent: "end",
         }}
      >
         <Stack
            justifyContent="flex-end"
            sx={{
               height: "50%",
               padding: 1.5,
               background: " linear-gradient(180deg, rgba(12, 12, 12, 0.00) 0%, #0C0C0C 75%, #0C0C0C 100%);",
            }}
         >
            <Stack spacing={3}>
               <Stack spacing={0.5}>
                  <Typography variant="h5" color="text.secondary" sx={{ fontWeight: "bold" }}>
                     {movie.title}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                     {movie.genre.map((genre: string, index) => (
                        <Typography key={index} color="grey.500">
                           #{genre.toLowerCase()}
                        </Typography>
                     ))}
                  </Stack>
               </Stack>
               <Stack direction="row" spacing={1}>
                  <Button startIcon={<BookmarkAddedIcon />} onClick={() => handleMarkAsWatched()} fullWidth>
                     <FormattedMessage id="WATCHLIST.CARD.BUTTON.PRIMARY" />
                  </Button>
                  <IconButton color="secondary" onClick={() => handleFlip()}>
                     <DeviceRotate />
                  </IconButton>
               </Stack>
            </Stack>
         </Stack>
      </OutlinedCard>
   );
};

export default FrontCard;
