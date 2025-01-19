import { Grid2 as Grid, Card, Stack, CardMedia, CardContent, Typography, Button, Box, useTheme } from "@mui/material";
import { motion } from "motion/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Movie } from "../../types/Watchlist.types";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

type WatchlistListProps = {
   data: Movie[];
};

const WatchlistList = ({ data }: WatchlistListProps) => {
   const { palette } = useTheme();
   return (
      <Grid container spacing={2}>
         {data.map((movie) => (
            <Grid
               size={{ xs: 12, md: 6 }}
               key={movie.title}
               component={motion.div}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
            >
               <Card
                  sx={{
                     height: 200,
                     borderRadius: 4,
                     display: "flex",
                  }}
               >
                  <CardMedia>
                     <LazyLoadImage
                        src={movie.cover}
                        alt={movie.title}
                        height={200}
                        width={133}
                        effect="blur"
                        style={{ borderLeft: "4px", borderRight: `2px solid ${palette.primary.main}` }}
                     />
                  </CardMedia>
                  <CardContent sx={{ padding: 2 }}>
                     <Stack justifyContent="space-between" sx={{ height: "100%" }}>
                        <Box>
                           <Typography color="primary.main" variant="h6">
                              {movie.title}
                           </Typography>
                           <Stack direction="row" spacing={1}>
                              <Typography variant="body2">{`${movie.duration} minutes`}</Typography>
                              <Typography variant="body2">{movie.director}</Typography>
                              <Typography variant="body2">{movie.productionYear}</Typography>
                           </Stack>
                           <Stack direction="row" spacing={1}>
                              {movie.genre.map((genre) => (
                                 <Typography variant="body2">#{genre}</Typography>
                              ))}
                           </Stack>
                        </Box>
                        <Stack spacing={1} direction="row">
                           <Button
                              type="submit"
                              variant="contained"
                              startIcon={<AddCircleOutlineOutlinedIcon />}
                              sx={{ borderRadius: 2, paddingX: 2 }}
                           >
                              <Typography variant="body2" sx={{ textTransform: "initial" }}>
                                 Mark as watched
                              </Typography>
                           </Button>
                           <Button
                              variant="text"
                              startIcon={<CancelOutlinedIcon color="secondary" />}
                              sx={{ borderRadius: 2, paddingX: 2 }}
                           >
                              <Typography color="secondary" variant="body2" sx={{ textTransform: "initial" }}>
                                 Delete
                              </Typography>
                           </Button>
                        </Stack>
                     </Stack>
                  </CardContent>
               </Card>
            </Grid>
         ))}
      </Grid>
   );
};

export default WatchlistList;
