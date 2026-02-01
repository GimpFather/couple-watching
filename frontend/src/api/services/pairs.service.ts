import { supabaseClient } from "~/api/client";
import type {
	MakePairByYourselfData,
	Pair,
	PairWithProfiles,
} from "~/api/types/pairs";
import { keysToCamel } from "~/utils/utils";

export const handlePairByYourself = async (
	data: MakePairByYourselfData,
): Promise<Pair> => {
	const { data: result, error } = await supabaseClient.rpc(
		"create_owner_only_pair",
		{
			p_my_profile_id: data.firstProfileId,
			p_partner_display_name: data.secondDisplayName,
			p_partner_avatar_seed: data.secondAvatarSeed,
		},
	);

	if (error) {
		throw error;
	}

	return keysToCamel(result[0]) as Pair;
};

export const deletePair = async (pairId: string) => {
	const { error } = await supabaseClient
		.from("pairs")
		.delete()
		.eq("id", pairId);
	if (error) {
		throw error;
	}
};

export const handleJoinPairByCode = async (
	partnerCode: string,
	myProfileId: string,
): Promise<Pair> => {
	const { data, error } = await supabaseClient.rpc("join_pair_by_code", {
		p_partner_code: partnerCode,
		p_my_profile_id: myProfileId,
	});

	if (error) {
		throw new Error(error.message || "Błąd podczas łączenia par");
	}

	return keysToCamel(data);
};

export const getMyPairWithProfiles =
	async (): Promise<PairWithProfiles | null> => {
		const { data, error } = await supabaseClient.rpc("get_my_pair");

		if (error) throw error;
		if (!data || data.length === 0) return null;

		return keysToCamel(data[0]) as PairWithProfiles;
	};
