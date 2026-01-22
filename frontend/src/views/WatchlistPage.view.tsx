import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { DiceFiveIcon } from "@phosphor-icons/react";
import PhoneContainer from "~/components/Layout/PhoneContainer";
import NBIconButton from "~/components/NeoBrutalism/NBIconButton";

const LibraryPage = () => {

   return (
      <PhoneContainer>
         <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="headingExtraLarge">Watchlist</Typography>
            <NBIconButton icon={<DiceFiveIcon />} />
         </Stack>
      </PhoneContainer>
   );
};

export default LibraryPage;
