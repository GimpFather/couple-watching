export type SearchMovieInputs = {
   title: string;
};

export type MarkMovieWatchedInputs = {
   watchedDate: Date;
   rating: number;
   opinion?: string;
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
   coolMode?: boolean;
   search?: string;
};
