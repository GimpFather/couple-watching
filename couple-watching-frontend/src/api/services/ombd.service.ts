import axiosInstance from "../axios";
import { MovieDetails } from "../models/movies.types";
import { mapKeys } from "lodash";

export const GetMovieDetails = async (title: string) => {
	const result = await axiosInstance.get<MovieDetails>("", {
		params: { t: title },
	});
	const transformedData = mapKeys(result.data, (_value: unknown, key: string) =>
		key.toLowerCase()
	);

	return transformedData;
};
