import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "~/api/queryKeys";
import { deletePair, getMyPairWithProfiles, handleJoinPairByCode, insertPairByYourself } from "~/api/services/pairs.service";
import type { MakePairByYourselfData } from "~/api/types/pairs";
import { usePairRealtime } from "./usePairRealtime";
import { useGetProfileData } from "./profiles";

//TODO: This is not used anywhere, but it's here for future use.
export const useMakePairByYourself = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationKey: [QUERY_KEYS.MAKE_PAIR_BY_YOURSELF],
      mutationFn: (data: MakePairByYourselfData) => insertPairByYourself(data),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_YOUR_PAIR_DATA] });
      },
   });
};

//TODO: This is not used anywhere, but it's here for future use.
export const useDeletePair = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationKey: [QUERY_KEYS.DELETE_PAIR],
      mutationFn: (pairId: string) => deletePair(pairId),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_YOUR_PAIR_DATA] });
      },
   });
};

export const useHandleJoinPairByCode = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationKey: [QUERY_KEYS.HANDLE_JOIN_PAIR_BY_CODE],
      mutationFn: ({ partnerCode, myProfileId }: { partnerCode: string, myProfileId: string }) => handleJoinPairByCode(partnerCode, myProfileId),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_YOUR_PAIR_DATA] });
      },
   });
};

export const useGetMyPairWithProfiles = (authId: string) => {
   const { data: profileData } = useGetProfileData(authId);
 
   usePairRealtime(profileData?.id);
 
   return useQuery({
     queryKey: [QUERY_KEYS.GET_YOUR_PAIR_DATA, authId],
     enabled: !!profileData?.id,
     queryFn: getMyPairWithProfiles,
   });
 };