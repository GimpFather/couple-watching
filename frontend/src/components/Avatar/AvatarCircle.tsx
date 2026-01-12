import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { generateAvatar } from "~/utils/utils";

interface AvatarCircleProps {
   seed: string;
}

const AvatarCircle = ({ seed }: AvatarCircleProps) => {
   const { palette } = useTheme();
   return (
      <Box sx={{ width: "80px", height: "80px", borderRadius: "50%", border: `5px solid ${palette.common.black}` }}>
         {seed ? (
            <img
               src={generateAvatar(seed)}
               alt="Avatar"
               style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
         ) : (
            <Skeleton variant="circular" width="100%" height="100%" />
         )}
      </Box>
   );
};

export default AvatarCircle;
