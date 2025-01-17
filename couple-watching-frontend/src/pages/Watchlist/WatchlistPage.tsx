import { Card, CardContent, CardMedia, Grid2 as Grid, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { WATCHLIST_STATIC_DATA } from "../../assets/WATCHLIST_STATIC_DATA";
import PageTitle from "../../components/Layout/PageTitle";
import WatchlistTable from "./WatchlistTable";
import { useForm } from "react-hook-form";
import Filters from "../../components/Watchlist/Filters";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "motion/react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const WatchlistPage = () => {
   const { control, watch } = useForm();
   return (
      <Stack spacing={4}>
         <PageTitle
            title="Watchlist"
            subtitle="This is a watchlist page, that will allow you to see what you wanna watch."
         />
         <Filters control={control} watch={watch} />
         {watch("coolMode") ? (
            <Grid container spacing={2}>
               {WATCHLIST_STATIC_DATA.map((movie) => (
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
                                 height={200}
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
                                 <Stack direction="row" spacing={1}>
                                    <Tooltip title="Mark as watched!" arrow>
                                       <IconButton sx={{ padding: 0 }} color="primary">
                                          <CheckCircleOutlineIcon />
                                       </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete from watchlist." arrow>
                                       <IconButton sx={{ padding: 0 }} color="secondary">
                                          <HighlightOffIcon />
                                       </IconButton>
                                    </Tooltip>
                                 </Stack>
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
         ) : (
            <Card variant="outlined" sx={{ borderRadius: 2, border: "2px solid", borderColor: "primary.main" }}>
               <WatchlistTable data={WATCHLIST_STATIC_DATA} />
            </Card>
         )}
      </Stack>
   );
};

export default WatchlistPage;
