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
                  caption="TAGS.HORNY"
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
                  caption="TAGS.SNOBBY"
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
                  caption="TAGS.SAD"
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
                  caption="TAGS.IS_LITERALLY_ME"
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
                  caption="TAGS.IS_GAY"
                  emoji="🏳️‍🌈"
               />
            )}
         />
         <Controller
            name="tags.isCertifiedShit"
            control={control}
            render={({ field }) => (
               <TagChip
                  handleClick={() => field.onChange(!field.value)}
                  value={!!watch("tags.isCertifiedShit")}
                  caption="TAGS.CERTIFIED_SHIT"
                  emoji="💩"
               />
            )}
         />
      </Grid>
   );
};

export default TagsSection;
