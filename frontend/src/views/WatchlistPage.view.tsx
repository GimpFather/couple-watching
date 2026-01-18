import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NBButton from "~/components/NeoBrutalism/NBButton";
import showToast from "~/components/Toasts/showToast";
import { BooksIcon } from "@phosphor-icons/react";
import PhoneContainer from "~/components/Layout/PhoneContainer";

const LibraryPage = () => {
   const handleWatchlistButton = () => {
      showToast({
         title: "Show me the watchlist!",
         description: "You are now in the watchlist!",
         color: "success",
         sound: "MEME_ALERT_SHINE",
      });
   };

   return (
      <PhoneContainer>
         <Stack direction="column" gap={2}>
            <Typography variant="headingExtraLarge">Watchlist</Typography>
            <Typography variant="bodyExtraLarge">This is the watchlist!</Typography>
            <Divider />
            <Stack direction="row" gap={2}>
               <NBButton icon={<BooksIcon />} onClick={() => handleWatchlistButton()}>
                  Show me the watchlist!
               </NBButton>
            </Stack>
         </Stack>
      </PhoneContainer>
   );
};

export default LibraryPage;
