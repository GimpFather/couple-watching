import { useEffect } from "react";
import { supabaseClient } from "~/api/client";
import { useQueryClient } from "@tanstack/react-query";
import QUERY_KEYS from "~/api/queryKeys";

export const usePairRealtime = (profileId?: string) => {
	const queryClient = useQueryClient();

	useEffect(() => {
		if (!profileId) return;

		const invalidate = () => {
			queryClient.invalidateQueries({
				queryKey: [QUERY_KEYS.GET_YOUR_PAIR_DATA],
			});
		};

		const channel = supabaseClient
			.channel("pair-changes")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "pairs",
					filter: `owner_profile_id=eq.${profileId}`,
				},
				invalidate,
			)
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "pairs",
					filter: `partner_profile_id=eq.${profileId}`,
				},
				invalidate,
			)
			.subscribe();

		return () => {
			supabaseClient.removeChannel(channel);
		};
	}, [profileId, queryClient]);
};
