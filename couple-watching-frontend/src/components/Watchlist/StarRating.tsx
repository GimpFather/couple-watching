import { Stack, Tooltip, useTheme } from "@mui/material";
import { motion } from "motion/react";
import React from "react";

type StarRatingProps = {
   value: number;
   handleRate: (value: number) => void;
};

const StarRating = ({ value, handleRate }: StarRatingProps) => {
   const { palette } = useTheme();
   const [hover, setHover] = React.useState(0);

   const handleTooltipText = (value: number) => {
      switch (value) {
         case 1:
            return "What a shitshow.";
         case 2:
            return "It was bad. Now I'm sad.";
         case 3:
            return "It wasn't okay.";
         case 4:
            return "It was okay.";
         case 5:
            return "Average.";
         case 6:
            return "It's better than average.";
         case 7:
            return "It's all good man.";
         case 8:
            return "Great watch!";
         case 9:
            return "Fuck yeah, that shit was good.";
         case 10:
            return "Fuckin perfection.";

         default:
            return "Bruh, what did you clicked?";
      }
   };
   return (
      <Stack spacing={1} direction="row">
         {[...Array(10)].map((_, index) => {
            const starValue = index + 1;
            return (
               <Tooltip key={index} title={handleTooltipText(starValue)} placement="bottom" arrow>
                  <motion.svg
                     viewBox="0 0 24 24"
                     width="32"
                     height="32"
                     initial={{ scale: 1, fill: palette.common.white }}
                     animate={{
                        fill: starValue <= (hover || value) ? palette.primary.main : palette.common.white,
                     }}
                     whileHover={{ scale: 1.2 }}
                     whileTap={{ scale: 0.8 }}
                     style={{ cursor: "pointer" }}
                     onClick={() => handleRate(starValue)}
                     onMouseEnter={() => setHover(starValue)}
                     onMouseLeave={() => setHover(0)}
                  >
                     <path d="M12 .587l3.668 7.431 8.2 1.19-5.93 5.773 1.398 8.144L12 18.896l-7.336 3.855 1.398-8.144-5.93-5.773 8.2-1.19z" />
                  </motion.svg>
               </Tooltip>
            );
         })}
      </Stack>
   );
};

export default StarRating;
