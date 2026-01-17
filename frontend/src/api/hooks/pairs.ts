import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabaseClient } from "~/api/client";
import { useAuth } from "~/context/auth/useAuth";
import QUERY_KEYS from "~/api/queryKeys";
import { deletePair, getMyPairWithProfiles, handleJoinPairByCode, insertPairByYourself } from "~/api/services/pairs.service";
import type { MakePairByYourselfData } from "~/api/types/pairs";

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

export const useGetMyPairWithProfiles = () => {
   const queryClient = useQueryClient();
   const { user } = useAuth();

   const query = useQuery({
      queryKey: [QUERY_KEYS.GET_YOUR_PAIR_DATA],
      queryFn: async () => {
         return getMyPairWithProfiles();
      },
      enabled: !!user, // Tylko gdy user jest zalogowany
   });

   // Real-time subscription - automatycznie aktualizuje gdy pojawi się nowa para
   // RLS automatycznie filtruje eventy po stronie serwera - user dostaje tylko zmiany dla swoich par
   useEffect(() => {
      // Tylko subskrybuj jeśli user jest zalogowany
      if (!user) {
         return;
      }

      const channel = supabaseClient
         .channel('pairs-changes')
         .on(
            'postgres_changes',
            {
               event: 'INSERT',
               schema: 'public',
               table: 'pairs',
               // RLS automatycznie filtruje - user dostaje tylko eventy dla swoich par
            },
            () => {
               queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_YOUR_PAIR_DATA] });
            }
         )
         .on(
            'postgres_changes',
            {
               event: 'UPDATE',
               schema: 'public',
               table: 'pairs',
            },
            () => {
               queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_YOUR_PAIR_DATA] });
            }
         )
         .on(
            'postgres_changes',
            {
               event: 'DELETE',
               schema: 'public',
               table: 'pairs',
            },
            () => {
               queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_YOUR_PAIR_DATA] });
            }
         )
         .subscribe();

      return () => {
         supabaseClient.removeChannel(channel);
      };
   }, [user, queryClient]);

   return query;
};