import { Grid2 as Grid, Card, Stack, CardMedia, CardContent, Typography } from "@mui/material";
import { motion } from "motion/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Movie } from "../../types/Watchlist.types";
import MovieActions from "./MovieActions";

type WatchlistListProps = {
   data: Movie[];
};

const WatchlistList = ({ data }: WatchlistListProps) => {
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
                     borderRadius: 2,
                  }}
               >
                  <Stack direction="row">
                     <CardMedia>
                        <LazyLoadImage
                           src={movie.cover}
                           alt={movie.title}
                           width={150}
                           effect="blur"
                           style={{ borderLeft: "4px" }}
                        />
                     </CardMedia>
                     <CardContent sx={{ padding: 2 }}>
                        <Stack
                           direction="row"
                           alignItems="center"
                           justifyContent="space-between"
                           sx={{ paddingBottom: 3 }}
                        >
                           <Typography variant="h6">{movie.title}</Typography>
                           <MovieActions />
                        </Stack>
                        <Stack spacing={1}>
                           <Stack direction="row" spacing={1}>
                              <Typography variant="body2">{`${movie.duration} minutes`}</Typography>
                              <Typography variant="body2">{movie.productionYear}</Typography>
                              <Typography variant="body2">{movie.director}</Typography>
                           </Stack>
                           <Stack direction="row" spacing={1}>
                              {movie.genre.map((genre) => (
                                 <Typography variant="body2">{genre}</Typography>
                              ))}
                           </Stack>
                           <Typography
                              sx={{
                                 display: "-webkit-box",
                                 WebkitLineClamp: 2,
                                 WebkitBoxOrient: "vertical",
                                 overflow: "hidden",
                                 textOverflow: "ellipsis",
                                 lineHeight: 1.5,
                                 maxHeight: "calc(1.5em * 2)",
                                 whiteSpace: "normal",
                              }}
                           >
                              {movie.plot}
                           </Typography>
                        </Stack>
                     </CardContent>
                  </Stack>
               </Card>
            </Grid>
         ))}
      </Grid>
   );
};

export default WatchlistList;

