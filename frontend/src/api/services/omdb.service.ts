import type {
	MovieSearch,
	MovieSearchCapital,
	OMDbSearchParameters,
	OMDbSearchResponse,
} from "~/api/types/omdb";
import { supabaseClient } from "~/api/client";
2;

export const getOMDbSearchForMovies = async ({
	title,
}: OMDbSearchParameters) => {
	const { data, error } =
		await supabaseClient.functions.invoke<OMDbSearchResponse>(
			"omdb-search?s=" + encodeURIComponent(title),
			{
				method: "GET",
			},
		);

	if (error) {
		throw error;
	}

	if (!data) {
		throw new Error("No data found");
	}

	const transformedData: MovieSearch[] = data.Search.map(
		(item: MovieSearchCapital) => ({
			imdbID: item.imdbID,
			title: item.Title,
			type: item.Type,
			year: item.Year,
			poster: item.Poster,
		}),
	);

	return transformedData;
};
