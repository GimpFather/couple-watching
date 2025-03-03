/* eslint-disable react-hooks/rules-of-hooks */
import { Stack, Typography, useTheme } from "@mui/material";
import { Movie } from "../../../types/Watchlist.types";
import { useDeleteMovieFromWatchlist } from "../../../api/hooks/movies";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import RatingChip from "../../General/Chips/RatingChip";
import DurationChip from "../../General/Chips/DurationChip";
import { useAuthContext } from "../../../context/AuthProvider";
import { usePair } from "../../../api/hooks/pairs";
import OutlinedCard from "../../General/Cards/OutlinedCard";
import IconButton from "../../General/IconButton";
import { DeviceRotate, Trash } from "@phosphor-icons/react";
import { FormattedMessage } from "react-intl";

type BackCardProps = {
   movie: Movie;
   handleFlip: () => void;
};

const BackCard = ({ movie, handleFlip }: BackCardProps) => {
   const { user } = useAuthContext();
   const { palette } = useTheme();
   if (!user) return null;
   const { data: pairData } = usePair(user.uid);
   const queryClient = useQueryClient();
   const { mutate: deleteMutate } = useDeleteMovieFromWatchlist();

   const genres = movie.genre.map((genre) => `#${genre.toLowerCase()}`).join(" ");

   const notifySuccess = () => toast("Nice! That film is officially trashed. 🗑️");
   const notifyError = () => toast("Oops! Something went wrong. 😢");

   if (!pairData) return null;

   const handleDeleteMovie = () => {
      deleteMutate(
         { movieId: movie.id, pairId: pairData.id },
         {
            onSuccess: () => {
               notifySuccess();
               queryClient.invalidateQueries({ queryKey: ["GET_WATCHLIST_MOVIES"] });
            },
            onError: (e) => {
               alert(e.message);
               notifyError();
            },
         }
      );
   };
   return (
      <OutlinedCard
         sx={{
            position: "absolute",
            backfaceVisibility: "hidden",
            padding: 1.5,
            width: 350,
            height: 500,
            borderRadius: 4,
            overflow: "hidden",
            transform: "rotateY(180deg)",
         }}
      >
         <Stack justifyContent="space-between" sx={{ height: "100%" }}>
            <Stack spacing={2}>
               <Stack spacing={0.5} direction="row">
                  <RatingChip rate={movie.imdbReview} />
                  <DurationChip duration={`${movie.duration} min`} />
               </Stack>
               <Stack gap={0.5}>
                  <Typography
                     variant="headingLarge"
                     sx={{
                        fontWeight: "bold",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        WebkitLineClamp: 3,
                        textOverflow: "ellipsis",
                     }}
                  >
                     {movie.title}
                  </Typography>
                  <Typography variant="bodyMedium" color="grey.500">
                     {genres}
                  </Typography>
               </Stack>
               <Stack spacing={0.25}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                     <Typography variant="bodyMedium">
                        <FormattedMessage id="WATCHLIST.CARD.DIRECTOR" />
                     </Typography>
                     <Typography variant="bodyMedium" fontWeight={700}>
                        {movie.director}
                     </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                     <Typography variant="bodyMedium">
                        <FormattedMessage id="WATCHLIST.CARD.RELEASE_YEAR" />
                     </Typography>
                     <Typography variant="bodyMedium" fontWeight={700}>
                        {movie.productionYear}
                     </Typography>
                  </Stack>
               </Stack>
               <Typography
                  variant="bodyMedium"
                  sx={{
                     display: "-webkit-box",
                     WebkitBoxOrient: "vertical",
                     overflow: "hidden",
                     WebkitLineClamp: 8,
                     textOverflow: "ellipsis",
                     fontStyle: "italic",
                  }}
               >
                  {movie.plot}
               </Typography>
            </Stack>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
               <IconButton color="error" onClick={() => handleDeleteMovie()}>
                  <Trash />
               </IconButton>
               <IconButton color="accent" onClick={() => handleFlip()}>
                  <DeviceRotate style={{ color: palette.text.primary }} />
               </IconButton>
            </Stack>
         </Stack>
      </OutlinedCard>
   );
};

export default BackCard;
