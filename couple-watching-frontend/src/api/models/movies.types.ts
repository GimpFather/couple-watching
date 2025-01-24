export interface MovieDetails {
   id: string;
   title: string;
   productionYear: string;
   plot: string;
   cover: string;
}

export interface MovieDetailsCapital {
   Title: string;
   Plot: string;
   Poster: string;
   Year: string;
   imdbId: string;
}

export interface MovieDetailsResponse {
   Search: MovieDetailsCapital[];
   Response: string;
   totalResults: string;
}
