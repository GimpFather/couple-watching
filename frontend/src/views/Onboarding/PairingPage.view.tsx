import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import NBButton from "~/components/NeoBrutalism/NBButton";
import PhoneContainer from "~/components/Layout/PhoneContainer";
import { useNavigationTransition } from "~/hooks/useNavigationTransition";

const PairingPage = () => {
   const handleNavigationTransition = useNavigationTransition();

   return (
      <PhoneContainer>
         <Stack direction="row" alignItems="center" sx={{ marginBottom: "24px" }}>
            <ArrowLeftIcon
               cursor="pointer"
               size={18}
               onClick={() => handleNavigationTransition("/customization/profile")}
            />
         </Stack>
         <Stack>
            <Box sx={{ position: "absolute", bottom: 0, left: 0, width: "100%", padding: "16px" }}>
               <NBButton type="submit" fullWidth>
                  Continue
               </NBButton>
            </Box>
         </Stack>
      </PhoneContainer>
   );
};

export default PairingPage;
