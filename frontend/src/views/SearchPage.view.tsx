import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NBButton from "~/components/NeoBrutalism/NBButton";
import showToast from "~/components/Toasts/showToast";
import { BinocularsIcon } from "@phosphor-icons/react";
import PhoneContainer from "~/components/Layout/PhoneContainer";

const SearchPage = () => {
   const handleSearchButton = () => {
      showToast({
         title: "Show me the search!",
         description: "You are now in the search! 🔍",
         color: "success",
         sound: "MEME_ALERT_SHINE",
      });
   };

   return (
      <PhoneContainer>
         <Stack direction="column" gap={2}>
            <Typography variant="headingExtraLarge">Search</Typography>
            <Typography variant="bodyExtraLarge">This is the search! 🔍</Typography>
            <Divider />
            <Stack direction="row" gap={2}>
               <NBButton icon={<BinocularsIcon />} onClick={() => handleSearchButton()}>
                  Show me the search!
               </NBButton>
            </Stack>
         </Stack>
      </PhoneContainer>
   );
};

export default SearchPage;
