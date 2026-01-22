import QUERY_KEYS from "../queryKeys";
import { getOMDbSearchForMovies } from "../services/omdb.service";
import type { OMDbSearchParameters } from "../types/omdb";
import { useQuery } from "@tanstack/react-query";

export const useGetOMDbSearchForMovies = ({ title }: OMDbSearchParameters) =>
    useQuery({
       queryKey: [QUERY_KEYS.GET_OMDB_SEARCH_FOR_MOVIES, title],
       queryFn: () => getOMDbSearchForMovies({ title }),
       enabled: !!title,
    });