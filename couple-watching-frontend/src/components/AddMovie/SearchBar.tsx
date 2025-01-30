import { InputAdornment, Stack, TextField, Typography, useTheme } from "@mui/material";
import { motion } from "motion/react";
import SearchIcon from "@mui/icons-material/Search";
import { Control, Controller } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import { SearchMovieInputs } from "../../types/Inputs.types";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

type SearchBarProps = {
   control: Control<SearchMovieInputs, unknown>;
   handleSubmit: () => void;
};

const SearchBar = ({ control, handleSubmit }: SearchBarProps) => {
   const { palette } = useTheme();
   return (
      <Stack
         spacing={2}
         direction="row"
         alignItems="center"
         justifyContent="space-between"
         sx={{ backgroundColor: "background.paper", borderRadius: 4 }}
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
                  onKeyDown={(e) => {
                     if (e.key === "Enter") {
                        field.onChange(e);
                     }
                  }}
                  label={<FormattedMessage id="ADD_MOVIE.SEARCHBAR.LABEL" />}
                  slotProps={{
                     input: {
                        startAdornment: (
                           <InputAdornment position="start">
                              <SearchIcon />
                           </InputAdornment>
                        ),
                        endAdornment: (
                           <Stack
                              component={motion.div}
                              whileHover={{ scale: 1.05, borderColor: palette.primary.main }}
                              onClick={() => handleSubmit()}
                              whileTap={{ scale: 0.95 }}
                              direction="row"
                              alignItems="center"
                              spacing={1}
                              sx={{ border: "2px solid", borderRadius: 2, paddingX: 1, marginLeft: 1 }}
                           >
                              <KeyboardReturnIcon />
                              <Typography variant="body2">
                                 <FormattedMessage id="ADD_MOVIE.SEARCHBAR.ENTER" />
                              </Typography>
                           </Stack>
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
