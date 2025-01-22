import { Card, Stack, Typography, useTheme } from "@mui/material";
import { Movie } from "../../../types/Watchlist.types";
import { motion } from "motion/react";
import StarIcon from "../../General/CustomIcons/StarIcon";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import FlipIcon from "./FlipIcon";
import CustomIconButton from "../../General/CustomIconButton";
import { FormattedMessage } from "react-intl";

type BackCardProps = {
   movie: Movie;
   handleFlip: () => void;
   handleMarkAsWatched: () => void;
};

const BackCard = ({ movie, handleFlip, handleMarkAsWatched }: BackCardProps) => {
   const { palette } = useTheme();
   return (
      <Card
         sx={{
            position: "absolute",
            backfaceVisibility: "hidden",
            padding: 2,
            width: 350,
            height: 500,
            borderRadius: 4,
            backgroundColor: "background.paper",
            overflow: "hidden",
            boxShadow: 3,
            transform: "rotateY(180deg)",
         }}
      >
         <Stack justifyContent="space-between" sx={{ height: "100%" }}>
            <Stack spacing={1}>
               <Stack direction="row" alignItems="baseline" justifyContent="space-between" spacing={1}>
                  <Typography
                     color="primary"
                     variant="h4"
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
                  <Stack
                     direction="row"
                     alignItems="center"
                     sx={{
                        padding: 1,
                        backgroundColor: "primary.main",
                        borderRadius: 4,
                     }}
                  >
                     <motion.svg viewBox="0 0 24 24" width="18" height="18" style={{ fill: palette.background.paper }}>
                        <StarIcon />
                     </motion.svg>
                     <Typography color="background.paper" variant="body2" sx={{ paddingLeft: 0.5 }}>
                        <Typography color="background.paper" variant="body2" fontWeight={600} component="span">
                           {movie.imdbReview}
                        </Typography>
                        /10
                     </Typography>
                  </Stack>
               </Stack>
               <Typography>
                  {movie.director} ({movie.productionYear})
               </Typography>
               <Typography
                  variant="body1"
                  sx={{
                     display: "-webkit-box",
                     WebkitBoxOrient: "vertical",
                     overflow: "hidden",
                     WebkitLineClamp: 8,
                     textOverflow: "ellipsis",
                  }}
               >
                  {movie.plot}
               </Typography>
               <Stack alignItems="center" direction="row" spacing={1}>
                  {movie.genre.map((genre) => (
                     <Typography variant="body1">#{genre}</Typography>
                  ))}
               </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
               <FlipIcon handleClick={() => handleFlip()} dark />
               <CustomIconButton
                  handleOnClick={() => handleMarkAsWatched()}
                  icon={<BookmarkAddedIcon />}
                  text={
                     <Typography>
                        <FormattedMessage id="WATCHLIST.CARD.BUTTON.PRIMARY" />
                     </Typography>
                  }
                  dark
               />
               <CustomIconButton
                  handleOnClick={() => alert("Delete")}
                  icon={<BookmarkRemoveIcon />}
                  text={
                     <Typography>
                        <FormattedMessage id="WATCHLIST.CARD.BUTTON.SECONDARY" />
                     </Typography>
                  }
                  dark
               />
            </Stack>
         </Stack>
      </Card>
   );
};

export default BackCard;
