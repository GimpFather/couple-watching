import { Stack } from "@mui/material";
import { motion } from "motion/react";
import { Control, Controller, UseFormWatch } from "react-hook-form";
import { SearchMovieInputs } from "../../types/Inputs.types";
import PickerButton from "../General/PickerButton";
import { FormattedMessage } from "react-intl";

type TypeSelectorProps = {
   control: Control<SearchMovieInputs, unknown>;
   watch: UseFormWatch<SearchMovieInputs>;
};

const TypeSelector = ({ control, watch }: TypeSelectorProps) => {
   return (
      <Stack
         direction="row"
         sx={{ padding: 2 }}
         spacing={2}
         component={motion.div}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
      >
         <Controller
            control={control}
            name="type"
            render={({ field }) => (
               <PickerButton
                  handleOnClick={() => field.onChange("movie")}
                  isSelected={watch("type") === "movie"}
                  caption={<FormattedMessage id="ADD_MOVIE.TYPE.MOVIE" />}
               />
            )}
         />
         <Controller
            control={control}
            name="type"
            render={({ field }) => (
               <PickerButton
                  handleOnClick={() => field.onChange("series")}
                  isSelected={watch("type") === "series"}
                  caption={<FormattedMessage id="ADD_MOVIE.TYPE.SERIES" />}
               />
            )}
         />
      </Stack>
   );
};

export default TypeSelector;
