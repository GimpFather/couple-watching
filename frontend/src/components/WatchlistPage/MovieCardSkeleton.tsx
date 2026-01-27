import { Skeleton } from "@mui/material";
import NBCard from "../NeoBrutalism/NBCard";

const MovieCardSkeleton = () => {

    return (
        <NBCard disableShadow sx={{ padding: '2.5px', height: 500, width: 344 }}>
            <Skeleton variant="rectangular" width="100%" height="100%" sx={{
                padding: '12px',
                backgroundImage: `linear-gradient(180deg, rgba(12, 12, 12, 0) 0%, #0C0C0C 95%, #0C0C0C 100%), url()`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "100%",
                width: "100%",
                borderRadius: "12px",
            }} />
        </NBCard>
    );
};

export default MovieCardSkeleton;