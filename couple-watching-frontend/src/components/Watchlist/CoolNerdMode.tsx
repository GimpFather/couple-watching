import { Stack, Typography, Box, useTheme } from "@mui/material";
import { motion } from "motion/react";
import { Control, Controller, FieldValues, UseFormWatch } from "react-hook-form";
import AdjustIcon from "@mui/icons-material/Adjust";

type CoolNerdModeProps = {
   control: Control<FieldValues, unknown>;
   watch: UseFormWatch<FieldValues>;
};

const CoolNerdMode = ({ control, watch }: CoolNerdModeProps) => {
   const { palette } = useTheme();
   return (
      <Stack
         spacing={2}
         direction="row"
         alignItems="center"
         justifyContent="space-between"
         sx={{ padding: 2, maxWidth: 375, backgroundColor: "background.paper", borderRadius: 4 }}
         component={motion.div}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
      >
         <Stack spacing={1}>
            <Typography variant="body1">
               <Typography component="span" display="inline" color="primary.main">
                  The Nerd Mode
               </Typography>{" "}
               and{" "}
               <Typography component="span" display="inline" color="secondary.main">
                  The Cool Mode
               </Typography>
            </Typography>
            <Typography variant="body2">Choose the way, you gonna see the list.</Typography>
         </Stack>
         <Controller
            name="coolMode"
            control={control}
            render={({ field }) => (
               <Box
                  onClick={() => field.onChange(!watch("coolMode"))}
                  sx={{
                     padding: 1,
                     backgroundColor: "#fff",
                     borderRadius: 4,
                     width: 44,
                     height: 24,
                     position: "relative",
                     cursor: "pointer",
                  }}
               >
                  <Box
                     component={motion.div}
                     whileHover={{ scale: 0.9 }}
                     whileTap={{ scale: 0.45 }}
                     animate={{
                        x: watch("coolMode") ? 16 : 0,
                        color: watch("coolMode") ? palette.secondary.main : palette.primary.main,
                     }}
                     sx={{
                        position: "absolute",
                        width: 20,
                        height: 20,
                        top: 0,
                        left: 2,
                        color: "primary.main",
                     }}
                     children={<AdjustIcon />}
                  />
               </Box>
            )}
         />
      </Stack>
   );
};

export default CoolNerdMode;
