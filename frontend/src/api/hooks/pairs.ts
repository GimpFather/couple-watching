import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "~/api/queryKeys";
import { deletePair, getYourPairData, insertPairByYourself } from "~/api/services/pairs.service";
import type { MakePairByYourselfData } from "~/api/types/pairs";

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

export const useGetYourPairData = (profileId?: number) => {
   return useQuery({
      queryKey: [QUERY_KEYS.GET_YOUR_PAIR_DATA, profileId],
      queryFn: async () => {
         if (profileId == null) return null;
         return getYourPairData(profileId);
      },
      enabled: profileId != null,
   });
};

export const useDeletePair = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationKey: [QUERY_KEYS.DELETE_PAIR],
      mutationFn: (pairId: number) => deletePair(pairId),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_YOUR_PAIR_DATA] });
      },
   });
};
