import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { generateAvatar } from "~/utils/utils";

interface AvatarCircleProps {
   seed: string;
   size: string;
   borderSize: string;
}

const AvatarCircle = ({ seed, size, borderSize }: AvatarCircleProps) => {
   const { palette } = useTheme();
   return (
      <Box sx={{ width: size, height: size, borderRadius: "50%", border: `${borderSize} solid ${palette.common.black}` }}>
         {seed ? (
            <img
               src={generateAvatar(seed)}
               alt="Avatar"
               style={{ width: "100%", height: "100%", borderRadius: "50%", position: "relative", zIndex: -1 }}
            />
         ) : (
            <Skeleton variant="circular" width="100%" height="100%" />
         )}
      </Box>
   );
};

export default AvatarCircle;
