import { Search } from "@mui/icons-material";
import { Box, Grid2 as Grid, Stack, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { SearchMovieInputs } from "../../types/Inputs.types";
import { useGetMovieDetails } from "../../api/hooks/movies";
import PageTitle from "../../components/Layout/PageTitle";
import SearchBar from "../../components/AddMovie/SearchBar";
import TypeSelector from "../../components/AddMovie/TypeSelector";
import CustomIconButton from "../../components/General/CustomIconButton";
import MovieCard from "../../components/AddMovie/MovieCard";

function ExamplePage() {
   const { control, handleSubmit, watch } = useForm<SearchMovieInputs>({
      defaultValues: { title: "", type: "movie" },
   });

   const { type, title } = watch();
   const { data: movieDetails, refetch } = useGetMovieDetails({ title, type });

   const onSubmit: SubmitHandler<SearchMovieInputs> = () => {
      refetch();
   };

   return (
      <Stack spacing={4}>
         <PageTitle title="Add the movie" subtitle="Search for the movie you want to add to your watchlist." />
         <form onSubmit={handleSubmit(onSubmit)}>
            <Stack sx={{ backgroundColor: "background.paper", borderRadius: 4, padding: 2 }}>
               <SearchBar control={control} />
               <TypeSelector watch={watch} control={control} />
               <Box sx={{ padding: 2, maxWidth: "375px" }}>
                  <CustomIconButton
                     text={<Typography>Search</Typography>}
                     icon={<Search />}
                     handleOnClick={handleSubmit(onSubmit)}
                  />
               </Box>
            </Stack>
         </form>
         {movieDetails && (
            <Grid container spacing={2}>
               {movieDetails.map((movie) => (
                  <MovieCard title={movie.title} cover={movie.cover} />
               ))}
            </Grid>
         )}
      </Stack>
   );
}

export default ExamplePage;
