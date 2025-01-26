import { MovieTags } from "./Inputs.types";

export type Movie = {
   id: string;
   title: string;
   productionYear: string;
   genre: string[];
   imdbReview: number;
   duration: string;
   director: string;
   plot: string;
   cover: string;
};

export type WatchedMovie = Movie & {
   watchedDate: string;
   rating: number;
   tags?: MovieTags;
};
