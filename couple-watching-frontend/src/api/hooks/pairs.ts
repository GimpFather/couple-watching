import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetPair, GetPairRequest, PostSendPairRequest, RespondToPairRequest } from "../services/firebase.service";
import { PairRequest, RespondToPair } from "../../types/Auth.types";

export const useSendPairRequest = () => {
   return useMutation<void, Error, PairRequest>({
      mutationFn: ({ from, to, inviterName }) => PostSendPairRequest({ from, to, inviterName }),
   });
};

export const usePairRequests = (userId: string) => {
   return useQuery({
      queryKey: ["PAIR_REQUEST", userId],
      queryFn: () => GetPairRequest(userId),
      enabled: !!userId,
   });
};

export const usePair = (userId: string) => {
   return useQuery({
      queryKey: ["PAIR_ID", userId],
      queryFn: () => GetPair(userId),
      enabled: !!userId,
   });
};

export const useRespondToPairRequest = () => {
   const queryClient = useQueryClient();

   return useMutation<void, Error, RespondToPair>({
      mutationFn: ({ requestId, accept, personOne, personTwo }) =>
         RespondToPairRequest({ requestId, accept, personOne, personTwo }),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["PAIR_REQUEST"] });
      },
   });
};
