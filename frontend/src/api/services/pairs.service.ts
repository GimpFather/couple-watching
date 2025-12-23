import { supabaseClient } from "~/api/client";
import type { MakePairByYourselfData, Pair } from "~/api/types/pairs";
import { keysToCamel } from "~/utils/utils";

export const insertPairByYourself = async (data: MakePairByYourselfData) => {
   const { error } = await supabaseClient.from("pairs").insert({
      first_profile_id: data.firstProfileId,
      second_display_name: data.secondDisplayName,
      status: "OWNER_ONLY",
   });

   if (error) {
      throw error;
   }
};

export const getYourPairData = async (profileId: number): Promise<Pair | null> => {
   const { data, error } = await supabaseClient
      .from("pairs")
      .select("*")
      .eq("first_profile_id", profileId)
      .maybeSingle();

   if (error) {
      throw error;
   }

   return keysToCamel(data);
};

export const deletePair = async (pairId: number) => {
   const { error } = await supabaseClient.from("pairs").delete().eq("id", pairId);
   if (error) {
      throw error;
   }
};
