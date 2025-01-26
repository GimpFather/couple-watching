export type SearchMovieInputs = {
   title: string;
   type: "movie" | "series";
};

export type MarkMovieWatchedInputs = {
   watchedDate: Date;
   rating: number;
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
