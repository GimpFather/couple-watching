import { Card, Stack, Typography, Box } from "@mui/material";
import { motion } from "motion/react";
import { Movie } from "../../types/Watchlist.types";
import SyncIcon from "@mui/icons-material/Sync";
import React from "react";
import StarIcon from "../General/CustomIcons/StarIcon";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";

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
            width: 350,
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
                  width: 350,
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
                     whileHover={{ scale: 1.05, rotate: 180 }}
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
                        <Stack
                           onClick={() => buttonAction()}
                           component={motion.div}
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.9 }}
                           direction="row"
                           justifyContent="center"
                           spacing={1}
                           sx={{
                              padding: 1,
                              backgroundColor: "primary.main",
                              borderRadius: 4,
                              color: "common.white",
                              width: "fit-content",
                              alignSelf: "center",
                           }}
                        >
                           <BookmarkAddedIcon />
                           <Typography>Mark as watched</Typography>
                        </Stack>
                     </Stack>
                  </Stack>
               </Stack>
            </Card>
            <Card
               sx={{
                  position: "absolute",
                  backfaceVisibility: "hidden",
                  padding: 2,
                  width: 350,
                  height: 500,
                  borderRadius: 4,
                  backgroundColor: "background.paper",
                  overflow: "hidden",
                  boxShadow: 3,
                  transform: "rotateY(180deg)",
               }}
            >
               <Stack justifyContent="space-between" sx={{ height: "100%" }}>
                  <Stack spacing={1}>
                     <Stack direction="row" alignItems="baseline" justifyContent="space-between" spacing={1}>
                        <Typography color="primary" variant="h4" sx={{ fontWeight: "bold" }}>
                           {data.title}
                        </Typography>
                        <Stack
                           direction="row"
                           alignItems="center"
                           sx={{
                              padding: 1,
                              backgroundColor: "primary.main",
                              borderRadius: 4,
                           }}
                        >
                           <motion.svg viewBox="0 0 24 24" width="18" height="18" style={{ fill: "#262626" }}>
                              <StarIcon />
                           </motion.svg>
                           <Typography color="background.paper" variant="body2" sx={{ paddingLeft: 0.5 }}>
                              <Typography color="background.paper" variant="body2" fontWeight={600} component="span">
                                 {data.imdbReview}
                              </Typography>
                              /10
                           </Typography>
                        </Stack>
                     </Stack>
                     <Typography>
                        {data.director} ({data.productionYear})
                     </Typography>
                     <Typography variant="body1">{data.plot}</Typography>
                     <Stack alignItems="center" direction="row" spacing={1}>
                        {data.genre.map((genre) => (
                           <Typography variant="body1">#{genre}</Typography>
                        ))}
                     </Stack>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                     <SyncIcon
                        component={motion.svg}
                        onClick={() => setFlipped((prev) => !prev)}
                        whileHover={{ scale: 1.05, rotate: 180 }}
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
                     <Stack
                        onClick={() => buttonAction()}
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{
                           padding: 1,
                           backgroundColor: "primary.main",
                           borderRadius: 4,
                           color: "background.paper",
                        }}
                     >
                        <BookmarkAddedIcon />
                        <Typography>Mark as watched</Typography>
                     </Stack>
                     <Stack
                        component={motion.div}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{
                           padding: 1,
                           backgroundColor: "primary.main",
                           borderRadius: 4,
                           color: "background.paper",
                        }}
                     >
                        <BookmarkRemoveIcon />
                        <Typography>Delete</Typography>
                     </Stack>
                  </Stack>
               </Stack>
            </Card>
         </motion.div>
      </Box>
   );
};

export default MovieCard;
