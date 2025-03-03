import { Stack, Tooltip, useTheme } from "@mui/material";
import { motion } from "motion/react";
import React from "react";
import { raiting } from "../../constants/RAITING";
import StarIcon from "../General/CustomIcons/StarIcon";

type StarRatingProps = {
   value: number;
   handleRate: (value: number) => void;
};

const StarRating = ({ value, handleRate }: StarRatingProps) => {
   const { palette } = useTheme();
   const [hover, setHover] = React.useState(0);

   return (
      <Stack spacing={1} direction="row">
         {[...Array(10)].map((_, index) => {
            const starValue = index + 1;
            return (
               <Tooltip key={index} title={raiting[starValue]} placement="bottom" arrow>
                  <motion.svg
                     viewBox="0 0 24 24"
                     width="24"
                     height="24"
                     initial={{ scale: 1, fill: palette.common.white }}
                     animate={{
                        fill: starValue <= (hover || value) ? palette.primary.main : palette.common.white,
                     }}
                     whileHover={{ scale: 1.2 }}
                     whileTap={{ scale: 0.8 }}
                     style={{ cursor: "pointer", outline: "none" }}
                     onClick={() => handleRate(starValue)}
                     onMouseEnter={() => setHover(starValue)}
                     onMouseLeave={() => setHover(0)}
                  >
                     <StarIcon />
                  </motion.svg>
               </Tooltip>
            );
         })}
      </Stack>
   );
};

export default StarRating;
