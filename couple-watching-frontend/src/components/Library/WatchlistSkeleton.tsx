import { Grid2 as Grid, useTheme } from "@mui/material";
import { motion } from "motion/react";

const WatchlistSkeleton = () => {
   const { palette } = useTheme();
   return (
      <Grid container spacing={2}>
         {[...Array(7)].map((_, index) => (
            <motion.div
               key={index}
               style={{
                  width: "350px",
                  height: "500px",
                  backgroundColor: palette.background.paper,
                  borderRadius: "16px",
               }}
               initial={{ opacity: 0.7 }}
               animate={{ opacity: [0.7, 1, 0.7] }}
               transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
               }}
            />
         ))}
      </Grid>
   );
};
export default WatchlistSkeleton;
