import { axiosOMDBInstance } from "../axios";
import {
   MovieSearchDetails,
   MovieSearchCapital,
   MovieSearchResponse,
   OMDbSearchParameters,
   OMDbMovieDetailsCapital,
   OMDbMovieDetails,
} from "../models/movies.types";

export const GetSearchForMovies = async ({ title, type }: OMDbSearchParameters) => {
   const result = await axiosOMDBInstance.get<MovieSearchResponse>("", {
      params: { s: title, type: type },
   });
   const transformedData: MovieSearchDetails[] = result.data.Search.map((item: MovieSearchCapital) => ({
      ...item,
      id: item.imdbId,
      title: item.Title,
      plot: item.Plot,
      cover: item.Poster,
      productionYear: item.Year,
   }));

   return transformedData;
};

export const GetMovieDetails = async ({ imdbId }: { imdbId: string }) => {
   const result = await axiosOMDBInstance.get<OMDbMovieDetailsCapital>("", {
      params: { i: imdbId },
   });

   const transformedData: OMDbMovieDetails = {
      title: result.data.Title,
      year: result.data.Year,
      rated: result.data.Rated,
      released: result.data.Released,
      runtime: result.data.Runtime,
      genre: result.data.Genre,
      director: result.data.Director,
      writer: result.data.Writer,
      actors: result.data.Actors,
      plot: result.data.Plot,
      language: result.data.Language,
      country: result.data.Country,
      awards: result.data.Awards,
      poster: result.data.Poster,
      ratings: result.data.Ratings.map((rating) => ({
         source: rating.Source,
         value: rating.Value,
      })),
      metascore: result.data.Metascore,
      imdbRating: result.data.imdbRating,
      imdbVotes: result.data.imdbVotes,
      imdbID: result.data.imdbID,
      type: result.data.Type,
      dvd: result.data.DVD,
      boxOffice: result.data.BoxOffice,
      production: result.data.Production,
      website: result.data.Website,
      response: result.data.Response,
   };

   return transformedData;
};
