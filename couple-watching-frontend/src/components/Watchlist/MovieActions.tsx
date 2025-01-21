import { IconButton, Stack, Tooltip } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import MarkWatchedDialog from "./MarkWatchedDialog";
import React from "react";

const MovieActions = () => {
   const [openMarkWatchedDialog, setOpenMarkWatchedDialog] = React.useState<boolean>(false);
   return (
      <>
         <Stack direction="row" spacing={1}>
            <Tooltip title="Mark as watched!" arrow>
               <IconButton sx={{ padding: 0 }} color="primary" onClick={() => setOpenMarkWatchedDialog(true)}>
                  <CheckCircleOutlineIcon />
               </IconButton>
            </Tooltip>
            <Tooltip title="Delete from watchlist." arrow>
               <IconButton sx={{ padding: 0 }} color="secondary">
                  <HighlightOffIcon />
               </IconButton>
            </Tooltip>
         </Stack>
         <MarkWatchedDialog open={openMarkWatchedDialog} onClose={() => setOpenMarkWatchedDialog(false)} />
      </>
   );
};

export default MovieActions;
