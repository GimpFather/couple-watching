export type SearchMovieInputs = {
   title: string;
   type: "movie" | "series";
};

export type MarkMovieWatchedInputs = {
   watchedDate: Date;
   rating: {
      ratingPersonOne: number;
      ratingPersonTwo: number;
      finalRating: number;
   };
   tags?: MovieTags;
};

export type MovieTags = {
   isHorny?: boolean;
   isSad?: boolean;
   isSnoby?: boolean;
   isLiterallyMe?: boolean;
   isCertifiedShit?: boolean;
   isGay?: boolean;
};

export type WatchlistFiltersInput = {
   watchlistMode?: "cool" | "nerd";
   search?: string;
};

export type SignInInput = {
   email: string;
   password: string;
};

export type RegisterInput = {
   displayName: string;
   email: string;
   password: string;
};
