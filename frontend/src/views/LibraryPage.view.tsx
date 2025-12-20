import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NBButton from "~/components/NeoBrutalism/NBButton";
import showToast from "~/components/Toasts/showToast";
import { BooksIcon } from "@phosphor-icons/react";
import PhoneContainer from "~/components/Layout/PhoneContainer";

const LibraryPage = () => {
   const handleLibraryButton = () => {
      showToast({
         title: "Show me the library!",
         description: "You are now in the library! 📚",
         color: "success",
         sound: "MEME_ALERT_SHINE",
      });
   };

   return (
      <PhoneContainer>
         <Stack direction="column" gap={2}>
            <Typography variant="headingExtraLarge">Library</Typography>
            <Typography variant="bodyExtraLarge">This is the library! 📚</Typography>
            <Divider />
            <Stack direction="row" gap={2}>
               <NBButton icon={<BooksIcon />} onClick={() => handleLibraryButton()}>
                  Show me the library!
               </NBButton>
            </Stack>
         </Stack>
      </PhoneContainer>
   );
};

export default LibraryPage;
