import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "motion/react";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import CustomSwitch from "../General/CustomSwitch";
import { SearchMovieInputs } from "../../types/Inputs.types";

type TypeSelectorProps = {
   control: Control<SearchMovieInputs, unknown>;
   watch: UseFormWatch<SearchMovieInputs>;
};

const TypeSelector = ({ control, watch }: TypeSelectorProps) => {
   const { breakpoints } = useTheme();
   const isMobile = useMediaQuery(breakpoints.down("md"));
   return (
      <Stack
         spacing={2}
         direction="row"
         alignItems="center"
         justifyContent="space-between"
         sx={{ padding: 2, width: !isMobile ? 350 : "100%", backgroundColor: "background.paper", borderRadius: 4 }}
         component={motion.div}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
      >
         <Stack spacing={1}>
            <Typography variant="body1">
               <Typography component="span" display="inline" color="primary.main">
                  Movie{" "}
               </Typography>
               or{" "}
               <Typography component="span" display="inline" color="secondary.main">
                  Series
               </Typography>
            </Typography>
            <Typography variant="body2">Pick type for better search.</Typography>
         </Stack>
         <Controller
            name="type"
            control={control}
            render={({ field }) => (
               <CustomSwitch
                  condition={watch("type") === "movie"}
                  handleOnChange={() => field.onChange(watch("type") === "movie" ? "series" : "movie")}
               />
            )}
         />
      </Stack>
   );
};

export default TypeSelector;
