import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetPairRequests, GetUserData, PostSendPairRequest, RespondToPairRequest } from "../services/firebase.service";

export const useSendPairRequest = () => {
   return useMutation<void, Error, { from: string; to: string }>({
      mutationFn: ({ from, to }) => PostSendPairRequest(from, to),
   });
};

export const usePairRequests = (userId: string) => {
   return useQuery({
      queryKey: ["pairRequests", userId],
      queryFn: () => GetPairRequests(userId),
      enabled: !!userId,
   });
};

export const useRespondToPairRequest = () => {
   const queryClient = useQueryClient();

   return useMutation<void, Error, { requestId: string; accept: boolean }>({
      mutationFn: ({ requestId, accept }) => RespondToPairRequest(requestId, accept),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["pairRequests", "userId"] });
      },
   });
};

export const useUser = (uid: string) => {
   return useQuery({
      queryKey: ["user", uid],
      queryFn: () => GetUserData(uid),
      enabled: !!uid,
   });
};
