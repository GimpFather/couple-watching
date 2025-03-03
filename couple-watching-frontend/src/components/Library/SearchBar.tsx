import { InputAdornment, Stack, TextField, useTheme } from "@mui/material";
import { motion } from "motion/react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { Control, Controller } from "react-hook-form";
import { WatchlistFiltersInput } from "../../types/Inputs.types";
import { useIntl } from "react-intl";

type SearchBarProps = {
   control: Control<WatchlistFiltersInput, unknown>;
};

const SearchBar = ({ control }: SearchBarProps) => {
   const { formatMessage } = useIntl();
   const { palette } = useTheme();
   return (
      <Stack
         spacing={2}
         direction="row"
         alignItems="center"
         justifyContent="space-between"
         component={motion.div}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
      >
         <Controller
            name="search"
            control={control}
            render={({ field }) => (
               <TextField
                  {...field}
                  variant="outlined"
                  placeholder={formatMessage({ id: "LIBRARY.FILTERS.SEARCHBAR.LABEL" })}
                  slotProps={{
                     input: {
                        sx: {
                           typography: "emphasizedBodyMedium",
                        },
                        startAdornment: (
                           <InputAdornment position="start">
                              <MagnifyingGlass color={palette.common.black} />
                           </InputAdornment>
                        ),
                        slotProps: {
                           input: {
                              sx: { paddingY: 1, paddingRight: 1.5 },
                           },
                        },
                     },
                  }}
                  sx={{
                     width: "100%",
                  }}
               />
            )}
         />
      </Stack>
   );
};

export default SearchBar;
