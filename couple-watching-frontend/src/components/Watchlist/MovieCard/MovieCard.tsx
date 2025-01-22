import { Box } from "@mui/material";
import { motion } from "motion/react";
import { Movie } from "../../../types/Watchlist.types";
import React from "react";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";

type MovieCardProps = {
   data: Movie;
   handleMarkAsWatched: () => void;
};

const MovieCard = ({ data, handleMarkAsWatched }: MovieCardProps) => {
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
            <FrontCard
               movie={data}
               handleFlip={() => handleCardFlip()}
               handleMarkAsWatched={() => handleMarkAsWatched()}
            />
            <BackCard
               movie={data}
               handleFlip={() => handleCardFlip()}
               handleMarkAsWatched={() => handleMarkAsWatched()}
            />
         </motion.div>
      </Box>
   );
};

export default MovieCard;
