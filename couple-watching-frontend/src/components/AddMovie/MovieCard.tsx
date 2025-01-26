import { Card, Stack, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { MovieSearchDetails } from "../../api/models/movies.types";
import AddToWatchlistDialog from "./AddToWatchlistDialog";
import React from "react";
import Button from "../General/Button";
import { FormattedMessage } from "react-intl";
import { motion } from "motion/react";

type MovieCard = {
   movie: MovieSearchDetails;
};

const MovieCard = ({ movie }: MovieCard) => {
   const [open, setOpen] = React.useState(false);
   return (
      <>
         <Card
            component={motion.div}
            initial={{
               opacity: 0,
               y: 100,
            }}
            animate={{
               opacity: 1,
               y: 0,
            }}
            sx={{
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
            <Stack justifyContent="flex-end" sx={{ height: "100%" }}>
               <Stack spacing={2}>
                  <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center" }}>
                     {movie.title} ({movie.productionYear})
                  </Typography>
                  <Stack spacing={1} direction="row" justifyContent="center">
                     <Button startIcon={<AddCircleIcon />} onClick={() => setOpen(true)}>
                        <FormattedMessage id="ADD_MOVIE.CARD.BUTTON.PRIMARY" />
                     </Button>
                  </Stack>
               </Stack>
            </Stack>
         </Card>
         {open && <AddToWatchlistDialog open={open} id={movie.id} onClose={() => setOpen(false)} />}
      </>
   );
};

export default MovieCard;
