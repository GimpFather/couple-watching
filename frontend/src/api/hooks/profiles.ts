import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfileData, updateProfileData } from "~/api/services/supabase.service";
import QUERY_KEYS from "~/api/queryKeys";
import type { Profile } from "../types/profiles";

export const useGetProfileData = (authId: string) =>
   useQuery({
      queryKey: [QUERY_KEYS.GET_PROFILE_DATA, authId],
      queryFn: () => getProfileData(authId),
      enabled: !!authId,
   });

export const useUpdateProfileData = (authId: string) =>
   useMutation({
      mutationKey: [QUERY_KEYS.UPDATE_PROFILE_DATA, authId],
      mutationFn: (data: Pick<Profile, "username">) => updateProfileData(authId, data),
   });

// export const usePostToWatchlist = () => {
//    return useMutation<void, Error, { newMovie: Movie; pairId: string }>({
//       mutationFn: ({ newMovie, pairId }) => PostMovieToWatchlist(newMovie, pairId),
//    });
// };
