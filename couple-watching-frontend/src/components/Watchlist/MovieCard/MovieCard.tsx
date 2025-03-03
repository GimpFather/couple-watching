import { Box } from "@mui/material";
import { motion } from "motion/react";
import { Movie, WatchedMovie } from "../../../types/Watchlist.types";
import React from "react";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";
import FrontWatchedCard from "./FrontWatchedCard";

type MovieCardProps = {
   data: Movie | WatchedMovie;
   handleMarkAsWatched: () => void;
   watched: boolean;
};

const MovieCard = ({ data, handleMarkAsWatched, watched }: MovieCardProps) => {
   const [flipped, setFlipped] = React.useState(false);
   const handleCardFlip = () => setFlipped((prev) => !prev);

   return (
      <Box
         sx={{
            perspective: "1000px",
            width: 350,
            height: 500,
         }}
      >
         <motion.div
            initial={{
               opacity: 0,
               y: 100,
            }}
            animate={{
               opacity: 1,
               y: 0,
               rotateY: flipped ? 180 : 0,
            }}
            transition={{
               duration: 0.6,
               type: "spring",
            }}
            style={{
               transformStyle: "preserve-3d",
               position: "relative",
            }}
         >
            {!watched ? (
               <FrontCard
                  movie={data as Movie}
                  handleFlip={() => handleCardFlip()}
                  handleMarkAsWatched={() => handleMarkAsWatched()}
               />
            ) : (
               <FrontWatchedCard
                  movie={data as WatchedMovie}
                  handleFlip={() => handleCardFlip()}
                  handleMarkAsWatched={() => handleMarkAsWatched()}
               />
            )}
            <BackCard movie={data} handleFlip={() => handleCardFlip()} />
         </motion.div>
      </Box>
   );
};

export default MovieCard;
