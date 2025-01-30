import { DialogActions, DialogContent, DialogTitle, Stack, useMediaQuery, useTheme } from "@mui/material";
import Skeleton from "../General/Skeleton";

const AddToWatchlistDialogSkeleton = () => {
   const { palette, breakpoints } = useTheme();
   const isMobile = useMediaQuery(breakpoints.down("sm"));
   return (
      <>
         <DialogTitle sx={{ minWidth: "350px" }}>
            <Stack spacing={2}>
               <Stack direction="row" spacing={2} alignItems="center">
                  <Skeleton width={"80%"} height={"40px"} color={palette.background.default} />
                  <Skeleton width={"20%"} height={"40px"} color={palette.background.default} />
               </Stack>
               <Stack direction="row" spacing={2} alignItems="center">
                  <Skeleton width={"100px"} height={"40px"} color={palette.background.default} />
                  <Skeleton width={"100px"} height={"40px"} color={palette.background.default} />
               </Stack>
            </Stack>
         </DialogTitle>
         <DialogContent>
            <Stack spacing={2}>
               <Skeleton width={"100%"} height={"80px"} color={palette.background.default} />
               <Stack direction="row" spacing={2}>
                  <Skeleton width={"100px"} height={"40px"} color={palette.background.default} />
                  <Skeleton width={"100px"} height={"40px"} color={palette.background.default} />
               </Stack>
            </Stack>
         </DialogContent>
         <DialogActions sx={{ padding: 2 }}>
            <Stack spacing={2} direction={isMobile ? "column" : "row"} justifyContent="flex-end" sx={{ width: "100%" }}>
               <Skeleton width={"200px"} height={"40px"} color={palette.background.default} />
            </Stack>
         </DialogActions>
      </>
   );
};

export default AddToWatchlistDialogSkeleton;
