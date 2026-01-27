import { Skeleton } from "@mui/material";
import NBCard from "../NeoBrutalism/NBCard";
import { motion } from "motion/react";

const MovieCardSkeleton = () => {

    return (
        <motion.div
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
            exit={{ opacity: 0, }}
            transition={{ duration: 0.3, ease: [0.87, 0, 0.13, 1] }}
        >
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
        </motion.div>
    );
};

export default MovieCardSkeleton;