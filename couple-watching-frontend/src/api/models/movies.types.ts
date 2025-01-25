export interface MovieSearchDetails {
   id: string;
   title: string;
   productionYear: string;
   plot: string;
   cover: string;
}

export interface MovieSearchCapital {
   Title: string;
   Plot: string;
   Poster: string;
   Year: string;
   imdbId: string;
}

export interface MovieSearchResponse {
   Search: MovieSearchCapital[];
   Response: string;
   totalResults: string;
   Error?: string;
}

export type OMDbSearchParameters = {
   title: string;
   type: "movie" | "series";
};

export type OMDbMovieDetailsCapital = {
   Title: string;
   Year: string;
   Rated: string;
   Released: string;
   Runtime: string;
   Genre: string;
   Director: string;
   Writer: string;
   Actors: string;
   Plot: string;
   Language: string;
   Country: string;
   Awards: string;
   Poster: string;
   Ratings: {
      Source: string;
      Value: string;
   }[];
   Metascore: string;
   imdbRating: string;
   imdbVotes: string;
   imdbID: string;
   Type: string;
   DVD: string;
   BoxOffice: string;
   Production: string;
   Website: string;
   Response: string;
};

export type OMDbMovieDetails = {
   title: string;
   year: string;
   rated: string;
   released: string;
   runtime: string;
   genre: string;
   director: string;
   writer: string;
   actors: string;
   plot: string;
   language: string;
   country: string;
   awards: string;
   poster: string;
   ratings: {
      source: string;
      value: string;
   }[];
   metascore: string;
   imdbRating: string;
   imdbVotes: string;
   imdbID: string;
   type: string;
   dvd: string;
   boxOffice: string;
   production: string;
   website: string;
   response: string;
};
