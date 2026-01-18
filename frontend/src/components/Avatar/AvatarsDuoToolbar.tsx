import AvatarCircle from "./AvatarCircle";
import Box from "@mui/material/Box";

interface AvatarsDuoToolbarProps {
    avatarSeedOne: string;
    avatarSeedTwo: string;
}

const AvatarsDuoToolbar = ({ avatarSeedOne, avatarSeedTwo }: AvatarsDuoToolbarProps) => {
    return (
        <Box sx={{ position: "relative", width: "20px", height: "20px" }}>
            <Box sx={{ position: "absolute", top: 0, left: -5, zIndex: 1, backgroundColor: "white", borderRadius: "50%", border: '0px solid' }}>
                <AvatarCircle seed={avatarSeedOne} size="20px" borderSize="2px" />
            </Box>
            <Box sx={{ position: "absolute", top: 0, left: 5, zIndex: 2, backgroundColor: "white", borderRadius: "50%", border: '0px solid' }}>
                <AvatarCircle seed={avatarSeedTwo} size="20px" borderSize="2px" />
            </Box>
        </Box>
    );
};

export default AvatarsDuoToolbar;
