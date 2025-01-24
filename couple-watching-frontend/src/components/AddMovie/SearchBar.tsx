import { InputAdornment, Stack, TextField } from "@mui/material";
import { motion } from "motion/react";
import SearchIcon from "@mui/icons-material/Search";
import { Control, Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { SearchMovieInputs } from "../../types/Inputs.types";

type SearchBarProps = {
   control: Control<SearchMovieInputs, unknown>;
};

const SearchBar = ({ control }: SearchBarProps) => {
   return (
      <Stack
         spacing={2}
         direction="row"
         alignItems="center"
         justifyContent="space-between"
         sx={{ padding: 2, width: "100%", backgroundColor: "background.paper", borderRadius: 4 }}
         component={motion.div}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
      >
         <Controller
            name="title"
            control={control}
            render={({ field }) => (
               <TextField
                  {...field}
                  label={<FormattedMessage id="FILTERS.SEARCHBAR.LABEL" />}
                  slotProps={{
                     input: {
                        startAdornment: (
                           <InputAdornment position="start">
                              <SearchIcon />
                           </InputAdornment>
                        ),
                     },
                  }}
                  sx={{ width: "100%" }}
               />
            )}
         />
      </Stack>
   );
};

export default SearchBar;
