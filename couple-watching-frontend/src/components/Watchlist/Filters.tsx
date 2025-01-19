import { Control, UseFormWatch } from "react-hook-form";
import CoolNerdMode from "./CoolNerdMode";
import { Grid2 as Grid } from "@mui/material";
import SearchBar from "./SearchBar";
import { WatchlistFiltersInput } from "../../types/Inputs.types";

type FiltersProps = {
   control: Control<WatchlistFiltersInput, unknown>;
   watch: UseFormWatch<WatchlistFiltersInput>;
};

const Filters = ({ control, watch }: FiltersProps) => {
   return (
      <Grid container spacing={2}>
         <Grid size={{ xs: 12, md: "auto" }}>
            <CoolNerdMode control={control} watch={watch} />
         </Grid>
         <Grid size={{ xs: 12, md: "grow" }}>
            <SearchBar control={control} />
         </Grid>
      </Grid>
   );
};

export default Filters;
