import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetPair, RespondToPairRequest } from "../services/firebase.service";
import { RespondToPair } from "../../types/Auth.types";

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
      mutationFn: ({ personOne, personTwo }) => RespondToPairRequest({ personOne, personTwo }),
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["PAIR_REQUEST"] });
      },
   });
};
