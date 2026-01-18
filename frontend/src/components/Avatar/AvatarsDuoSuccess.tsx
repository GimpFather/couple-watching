import AvatarCircle from "./AvatarCircle";
import Box from "@mui/material/Box";

interface AvatarsDuoSuccessProps {
    avatarSeedOne: string;
    avatarSeedTwo: string;
}

const AvatarsDuoSuccess = ({ avatarSeedOne, avatarSeedTwo }: AvatarsDuoSuccessProps) => {
    return (
        <Box sx={{ position: "relative", width: "96px", height: "96px" }}>
            <Box sx={{ position: "absolute", top: 0, left: -24, zIndex: 1, backgroundColor: "white", borderRadius: "50%", border: '0px solid' }}>
                <AvatarCircle seed={avatarSeedOne} />
            </Box>
            <Box sx={{ position: "absolute", top: 0, left: 24, zIndex: 2, backgroundColor: "white", borderRadius: "50%", border: '0px solid' }}>
                <AvatarCircle seed={avatarSeedTwo} />
            </Box>
        </Box>
    );
};

export default AvatarsDuoSuccess;
