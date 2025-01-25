import { Box, Card, Stack, Typography } from "@mui/material";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { Movie } from "../../../types/Watchlist.types";
import FlipIcon from "./FlipIcon";
import CustomIconButton from "../../General/CustomIconButton";
import { FormattedMessage } from "react-intl";

type FrontCardProps = {
   movie: Movie;
   handleFlip: () => void;
   handleMarkAsWatched: () => void;
};

const FrontCard = ({ movie, handleFlip, handleMarkAsWatched }: FrontCardProps) => {
   return (
      <Card
         sx={{
            position: "absolute",
            backfaceVisibility: "hidden",
            padding: 2,
            width: 350,
            height: 500,
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: 3,
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,1)), url(${movie.cover})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
         }}
      >
         <Stack justifyContent="space-between" sx={{ height: "100%" }}>
            <Box sx={{ marginLeft: "auto" }}>
               <FlipIcon handleClick={() => handleFlip()} />
            </Box>
            <Stack>
               <Stack spacing={1}>
                  <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center" }}>
                     {movie.title}
                  </Typography>
                  <Stack direction="row" justifyContent="center" spacing={1}>
                     {movie.genre.map((genre: string, index) => (
                        <Typography key={index}>#{genre}</Typography>
                     ))}
                  </Stack>
                  <Box sx={{ width: "fit-content", alignSelf: "center" }}>
                     <CustomIconButton
                        handleOnClick={() => handleMarkAsWatched()}
                        icon={<BookmarkAddedIcon />}
                        text={
                           <Typography>
                              <FormattedMessage id="WATCHLIST.CARD.BUTTON.PRIMARY" />
                           </Typography>
                        }
                     />
                  </Box>
               </Stack>
            </Stack>
         </Stack>
      </Card>
   );
};

export default FrontCard;
