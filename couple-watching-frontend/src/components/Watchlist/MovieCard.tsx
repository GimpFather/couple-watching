import { Card, Stack, Typography, Button, Box } from "@mui/material";
import { motion } from "motion/react";
import { Movie } from "../../types/Watchlist.types";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SyncIcon from "@mui/icons-material/Sync";
import React from "react";

type MovieCardProps = {
   data: Movie;
   buttonAction: () => void;
};

const MovieCard = ({ data, buttonAction }: MovieCardProps) => {
   const [flipped, setFlipped] = React.useState(false);

   return (
      <Box
         sx={{
            perspective: "1000px",
            width: 375,
            height: 500,
         }}
      >
         <motion.div
            animate={{
               rotateY: flipped ? 180 : 0,
            }}
            transition={{
               duration: 0.6,
               type: "spring",
            }}
            style={{
               transformStyle: "preserve-3d",
               position: "relative",
            }}
         >
            <Card
               sx={{
                  position: "absolute",
                  backfaceVisibility: "hidden",
                  padding: 2,
                  width: 375,
                  height: 500,
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: 3,
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,1)), url(${data.cover})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
               }}
            >
               <Stack justifyContent="space-between" sx={{ height: "100%" }}>
                  <SyncIcon
                     component={motion.svg}
                     onClick={() => setFlipped((prev) => !prev)}
                     whileHover={{ scale: 1.1, rotate: 180 }}
                     whileTap={{ scale: 0.9, rotate: 360 }}
                     transition={{ duration: 1, type: "spring" }}
                     sx={{
                        marginLeft: "auto",
                        backgroundColor: "primary.main",
                        color: "common.white",
                        padding: 1,
                        fontSize: 40,
                        borderRadius: "50%",
                        outline: "none",
                     }}
                  />
                  <Stack>
                     <Stack spacing={1}>
                        <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center" }}>
                           {data.title}
                        </Typography>
                        <Stack direction="row" justifyContent="center" spacing={1}>
                           {data.genre.map((genre) => (
                              <Typography variant="body1">#{genre}</Typography>
                           ))}
                        </Stack>
                        <Button
                           onClick={() => buttonAction()}
                           variant="contained"
                           startIcon={<AddCircleOutlineOutlinedIcon />}
                           sx={{ borderRadius: 2, paddingX: 2, alignSelf: "center" }}
                        >
                           <Typography variant="body2" sx={{ textTransform: "initial" }}>
                              Mark as watched
                           </Typography>
                        </Button>
                     </Stack>
                  </Stack>
               </Stack>
            </Card>
            <Card
               sx={{
                  position: "absolute",
                  backfaceVisibility: "hidden",
                  padding: 2,
                  width: 375,
                  height: 500,
                  borderRadius: 4,
                  backgroundColor: "background.paper",
                  overflow: "hidden",
                  boxShadow: 3,
                  transform: "rotateY(180deg)",
               }}
            >
               <Stack justifyContent="space-between" sx={{ height: "100%" }}>
                  <Stack justifyContent="space-between" sx={{ height: "100%" }}>
                     <Stack spacing={1}>
                        <Typography color="primary" variant="h5" sx={{ fontWeight: "bold" }}>
                           {data.title}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                           {data.genre.map((genre) => (
                              <Typography variant="body1">#{genre}</Typography>
                           ))}
                        </Stack>
                        <Typography variant="body1">{data.plot}</Typography>
                        <Typography>Duration: {data.duration} minutes</Typography>
                        <Typography>Director: {data.director}</Typography>
                        <Typography>IMDB Review: {data.imdbReview}</Typography>
                     </Stack>
                     <Stack direction="row" justifyContent="space-between">
                        <SyncIcon
                           component={motion.svg}
                           onClick={() => setFlipped((prev) => !prev)}
                           whileHover={{ scale: 1.1, rotate: 180 }}
                           whileTap={{ scale: 0.9, rotate: 360 }}
                           transition={{ duration: 1, type: "spring" }}
                           sx={{
                              backgroundColor: "primary.main",
                              color: "background.paper",
                              padding: 1,
                              fontSize: 40,
                              borderRadius: "50%",
                              outline: "none",
                           }}
                        />
                        <Button
                           onClick={() => buttonAction()}
                           variant="contained"
                           startIcon={<AddCircleOutlineOutlinedIcon />}
                           sx={{ borderRadius: 2, paddingX: 2, alignSelf: "center" }}
                        >
                           <Typography variant="body2" sx={{ textTransform: "initial" }}>
                              Mark as watched
                           </Typography>
                        </Button>
                     </Stack>
                  </Stack>
               </Stack>
            </Card>
         </motion.div>
      </Box>
   );
};

export default MovieCard;
