import { Control, FieldValues, UseFormWatch } from "react-hook-form";
import CoolNerdMode from "./CoolNerdMode";
import { Stack } from "@mui/material";

type FiltersProps = {
   control: Control<FieldValues, unknown>;
   watch: UseFormWatch<FieldValues>;
};

const Filters = ({ control, watch }: FiltersProps) => {
   return (
      <Stack direction="row" spacing={1}>
         <CoolNerdMode control={control} watch={watch} />
      </Stack>
   );
};

export default Filters;
