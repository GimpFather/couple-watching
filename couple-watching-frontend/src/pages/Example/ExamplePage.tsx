import React from "react";
import { Search } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { SearchMovieInputs } from "../../types/Inputs.types";
import { useGetMovieDetails } from "../../api/hooks/movies";
import PageTitle from "../../components/Layout/PageTitle";
import SearchBar from "../../components/AddMovie/SearchBar";
import TypeSelector from "../../components/AddMovie/TypeSelector";

function ExamplePage() {
   const [search, setSearch] = React.useState<{ title: string; type: "movie" | "series" }>({
      title: "Fight Club",
      type: "movie",
   });
   const { data: movieDetails } = useGetMovieDetails({ title: search.title, type: search.type });
   const { control, handleSubmit, watch } = useForm<SearchMovieInputs>();
   console.log(movieDetails);

   const onSubmit: SubmitHandler<SearchMovieInputs> = (data) => {
      setSearch({ title: data.title, type: data.type });
   };

   return (
      <Stack spacing={4}>
         <PageTitle title="Add the movie" subtitle="Search for the movie you want to add to your watchlist." />
         <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
               <SearchBar control={control} />
               <TypeSelector watch={watch} control={control} />
               <IconButton disabled={!watch("title")} type="submit" onClick={handleSubmit(onSubmit)}>
                  <Search sx={{ color: !watch("title") ? "#C6BFB5" : "primary.main" }} />
               </IconButton>
            </Stack>
         </form>
      </Stack>
   );
}

export default ExamplePage;
