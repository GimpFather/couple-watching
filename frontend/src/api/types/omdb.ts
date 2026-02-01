export type OMDbSearchParameters = {
	title: string;
	type?: "movie" | "series" | "episode";
};

export interface OMDbSearchResponse {
	Search: MovieSearchCapital[];
	Response: string;
	totalResults: string;
	Error?: string;
}

export type MovieSearchCapital = {
	Poster: string;
	Title: string;
	Type: string;
	Year: string;
	imdbID: string;
};

export interface MovieSearch {
	poster: string;
	title: string;
	type: string;
	year: string;
	imdbID: string;
}
