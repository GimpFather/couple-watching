import { Control, Controller, UseFormWatch } from "react-hook-form";
import TagChip from "../General/TagChip";
import { handleGradient } from "../../utils";
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
                  background={handleGradient("#f95979", "#c90084", "#ae0072")}
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
                  background={handleGradient("#f9b9c5", "#d97a93", "#c76084")}
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
                  background={handleGradient("	#8bbccc", "	#4a7599 ", "#2f4858")}
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
                  background={handleGradient("	#d27f8e ", "	#a0674b", "#774936 ")}
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
                  background={
                     "linear-gradient(to right, rgb(237, 34, 36), rgb(243, 91, 34), rgb(249, 150, 33), rgb(245, 193, 30), rgb(241, 235, 27) 27%, rgb(241, 235, 27), rgb(241, 235, 27) 33%, rgb(99, 199, 32), rgb(12, 155, 73), rgb(33, 135, 141), rgb(57, 84, 165), rgb(97, 55, 155), rgb(147, 40, 142))"
                  }
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
                  background={handleGradient("		#6b4f2a", "	#8a5a30", "#a0764a")}
               />
            )}
         />
      </Grid>
   );
};

export default TagsSection;
