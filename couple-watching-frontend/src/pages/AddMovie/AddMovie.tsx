import { Grid2 as Grid, Stack, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { SearchMovieInputs } from "../../types/Inputs.types";
import { useGetSearchForMovies } from "../../api/hooks/movies";
import PageTitle from "../../components/Layout/PageTitle";
import SearchBar from "../../components/AddMovie/SearchBar";
import TypeSelector from "../../components/AddMovie/TypeSelector";
import MovieCard from "../../components/AddMovie/MovieCard";
import SearchErrorSection from "../../components/AddMovie/SearchErrorSection";
import React from "react";

function ExamplePage() {
   const { control, handleSubmit, watch } = useForm<SearchMovieInputs>({
      defaultValues: { title: "", type: "movie" },
   });

   const { type, title } = watch();
   const { data: movieDetails, refetch, error, isLoading } = useGetSearchForMovies({ title, type });

   const onSubmit: SubmitHandler<SearchMovieInputs> = React.useCallback(() => {
      refetch();
   }, [refetch]);

   React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
         if (event.key === "Enter") {
            handleSubmit(onSubmit)();
         }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
         document.removeEventListener("keydown", handleKeyDown);
      };
   }, [handleSubmit, onSubmit]);

   return (
      <Stack spacing={4}>
         <PageTitle title="ADD_MOVIE.HEADER" subtitle="ADD_MOVIE.SUBTITLE" />
         <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
               container
               spacing={2}
               alignItems="center"
               sx={{ backgroundColor: "background.paper", borderRadius: 4, padding: 2 }}
            >
               <Grid size={{ xs: 12, md: "grow" }}>
                  <SearchBar control={control} />
               </Grid>
               <Grid size={{ xs: 12, md: "auto" }}>
                  <TypeSelector watch={watch} control={control} />
               </Grid>
            </Grid>
         </form>
         {isLoading && <Typography>Loading...</Typography>}
         {error && <SearchErrorSection response={error?.message} />}
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
