import { Grid2 as Grid, Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { SearchMovieInputs } from "../../types/Inputs.types";
import { useGetSearchForMovies } from "../../api/hooks/movies";
import PageTitle from "../../components/Layout/PageTitle";
import SearchBar from "../../components/AddMovie/SearchBar";
import TypeSelector from "../../components/AddMovie/TypeSelector";
import MovieCard from "../../components/AddMovie/MovieCard";
import SearchErrorSection from "../../components/AddMovie/SearchErrorSection";
import React from "react";
import Loading from "../../components/General/Loading";
import InfoSection from "../../components/General/InfoSection";
import { ADD_MOVIE_PLACEHOLDERS } from "../../constants/ADD_MOVIE_PLACEHOLDERS";
import { random } from "lodash";

function ExamplePage() {
   const [placeholderCaptions, setPlaceholderCaptions] = React.useState(
      ADD_MOVIE_PLACEHOLDERS[random(0, ADD_MOVIE_PLACEHOLDERS.length - 1)]
   );
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

   React.useEffect(() => {
      const randomCaption = ADD_MOVIE_PLACEHOLDERS[random(0, ADD_MOVIE_PLACEHOLDERS.length - 1)];
      setPlaceholderCaptions(randomCaption);
   }, []);

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
                  <SearchBar control={control} handleSubmit={() => refetch()} />
               </Grid>
               <Grid size={{ xs: 12, md: "auto" }}>
                  <TypeSelector watch={watch} control={control} />
               </Grid>
            </Grid>
         </form>
         {isLoading ? (
            <Loading />
         ) : error ? (
            <SearchErrorSection response={error?.message} />
         ) : movieDetails ? (
            <>
               {movieDetails && movieDetails.length !== 0 && (
                  <Grid container spacing={2}>
                     {movieDetails.map((movie, index) => (
                        <MovieCard key={index} movie={movie} />
                     ))}
                  </Grid>
               )}
            </>
         ) : (
            <InfoSection
               title={placeholderCaptions.title}
               subtitle={placeholderCaptions.subtitle}
               emoji={placeholderCaptions.emoji}
            />
         )}
      </Stack>
   );
}

export default ExamplePage;
