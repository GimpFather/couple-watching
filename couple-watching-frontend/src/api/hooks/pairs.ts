import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetPairRequests, GetUserData, PostSendPairRequest, RespondToPairRequest } from "../services/firebase.service";
import { PairRequest, RespondToPair } from "../../types/Auth.types";

export const useSendPairRequest = () => {
   return useMutation<void, Error, PairRequest>({
      mutationFn: ({ from, to, inviterName }) => PostSendPairRequest({ from, to, inviterName }),
   });
};

export const usePairRequests = (userId: string) => {
   return useQuery({
      queryKey: ["PAIR_REQUEST", userId],
      queryFn: () => GetPairRequests(userId),
      enabled: !!userId,
   });
};

export const useRespondToPairRequest = () => {
   const queryClient = useQueryClient();

   return useMutation<void, Error, RespondToPair>({
      mutationFn: ({ requestId, accept }) => RespondToPairRequest({ requestId, accept }),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["PAIR_REQUEST"] });
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
