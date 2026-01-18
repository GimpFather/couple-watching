import AvatarCircle from "./AvatarCircle";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { QuestionMarkIcon } from "@phosphor-icons/react";

interface AvatarsDuoProps {
   avatarSeedOne: string;
}

const AvatarsDuo = ({ avatarSeedOne }: AvatarsDuoProps) => {
   const { palette } = useTheme();
   return (
      <Box sx={{ position: "relative", width: "80px", height: "80px" }}>
         <Box sx={{ position: "absolute", top: 0, left: -20, zIndex: 1 }}>
            <AvatarCircle seed={avatarSeedOne} size="80px" borderSize="5px" />
         </Box>
         <Box
            sx={{
               position: "absolute",
               top: 0,
               left: 20,
               zIndex: 2,
               width: "80px",
               height: "80px",
               borderRadius: "50%",
               border: `5px solid ${palette.common.black}`,
               backgroundColor: palette.common.white,
            }}
         >
            <QuestionMarkIcon style={{ width: "100%", height: "100%" }} />
         </Box>
      </Box>
   );
};

export default AvatarsDuo;
