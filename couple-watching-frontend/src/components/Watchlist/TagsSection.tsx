import { Control, Controller, UseFormWatch } from "react-hook-form";
import TagChip from "../General/TagChip";
import { Grid2 as Grid } from "@mui/material";
import { MarkMovieWatchedInputs } from "../../types/Inputs.types";

type TagSecionProps = {
   control: Control<MarkMovieWatchedInputs, unknown>;
   watch: UseFormWatch<MarkMovieWatchedInputs>;
};

const TagsSection = ({ control, watch }: TagSecionProps) => {
   return (
      <Grid container spacing={1}>
         <Controller
            name="tags.isHorny"
            control={control}
            render={({ field }) => (
               <TagChip
                  handleClick={() => field.onChange(!field.value)}
                  value={!!watch("tags.isHorny")}
                  caption={"Horny"}
                  emoji="🥵"
               />
            )}
         />
         <Controller
            name="tags.isSnoby"
            control={control}
            render={({ field }) => (
               <TagChip
                  handleClick={() => field.onChange(!field.value)}
                  value={!!watch("tags.isSnoby")}
                  caption={"Snoby"}
                  emoji="🍷"
               />
            )}
         />
         <Controller
            name="tags.isSad"
            control={control}
            render={({ field }) => (
               <TagChip
                  handleClick={() => field.onChange(!field.value)}
                  value={!!watch("tags.isSad")}
                  caption={"Sad"}
                  emoji="😟"
               />
            )}
         />
         <Controller
            name="tags.isLiterallyMe"
            control={control}
            render={({ field }) => (
               <TagChip
                  handleClick={() => field.onChange(!field.value)}
                  value={!!watch("tags.isLiterallyMe")}
                  caption={"Is Literally Me"}
                  emoji="😎"
               />
            )}
         />
         <Controller
            name="tags.isGay"
            control={control}
            render={({ field }) => (
               <TagChip
                  handleClick={() => field.onChange(!field.value)}
                  value={!!watch("tags.isGay")}
                  caption={"PRIDE"}
                  emoji="🏳️‍🌈"
               />
            )}
         />
         <Controller
            name="tags.isShityAsFuck"
            control={control}
            render={({ field }) => (
               <TagChip
                  handleClick={() => field.onChange(!field.value)}
                  value={!!watch("tags.isShityAsFuck")}
                  caption={"Certified Shit"}
                  emoji="💩"
               />
            )}
         />
      </Grid>
   );
};

export default TagsSection;
