import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { PlusCircleIcon } from "@phosphor-icons/react";
import PhoneContainer from "~/components/Layout/PhoneContainer";
import NBIconButton from "~/components/NeoBrutalism/NBIconButton";
import NBSearchBox from "~/components/NeoBrutalism/NBSearchBox";

const LibraryPage = () => {

   return (
      <PhoneContainer>
         <Stack direction="column" gap={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
               <Typography variant="headingExtraLarge">Watchlist</Typography>
               <NBIconButton icon={<PlusCircleIcon />} />
            </Stack>
            <NBSearchBox placeholder="Search in watchlist" />
         </Stack>
      </PhoneContainer>
   );
};

export default LibraryPage;
