export type SearchMovieInputs = {
   title: string;
};

export type MarkMovieWatchedInputs = {
   watchedDate: Date;
   rating: number;
   opinion?: string;
};
