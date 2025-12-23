import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfileData, updateProfileData } from "~/api/services/profiles.services";
import QUERY_KEYS from "~/api/queryKeys";
import type { Profile } from "~/api/types/profiles";

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
