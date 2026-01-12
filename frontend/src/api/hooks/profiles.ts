import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfileData, updateProfileData } from "~/api/services/profiles.services";
import QUERY_KEYS from "~/api/queryKeys";
import type { Profile } from "~/api/types/profiles";

export const useGetProfileData = (authId: string) =>
   useQuery({
      queryKey: [QUERY_KEYS.GET_PROFILE_DATA, authId],
      queryFn: () => getProfileData(authId),
      enabled: !!authId,
   });

export const useUpdateProfileData = (authId: string) => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationKey: [QUERY_KEYS.UPDATE_PROFILE_DATA, authId],
      mutationFn: (data: Pick<Profile, "username" | "avatarSeed">) => updateProfileData(authId, data),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_PROFILE_DATA, authId] });
         queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_YOUR_PAIR_DATA] });
      },
   });
};
